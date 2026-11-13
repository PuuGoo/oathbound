// PROTOTYPE - NOT FOR PRODUCTION
// Offline, reproducible import of user-supplied PNGs. Originals are read-only.
// Animation labels/crops are visually inferred, NOT an authored game manifest.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { decodePNG, encodePNG } = require('./import-belinda.cjs');
const { removeBackground } = require('./import-team.cjs');
const CELL = 256, ANCHOR = 128, GROUND = 220;
// Nonuniform body centers and gutters measured on each original; no uniform-grid assumption.
const row = (name, y, end, ground, centers, edges) => ({ name, y, end, ground, centers,
  bounds: centers.map((x, i) => [edges ? edges[i] : (i ? Math.round((centers[i - 1] + x) / 2) : Math.max(0, x - 75)),
    edges ? edges[i + 1] : (i + 1 < centers.length ? Math.round((x + centers[i + 1]) / 2) : x + 80)]) });
const SPECS = {
  thane: { folder: '6.Thane', file: 'Thane’s Fantasy Combat Sprite Atlas.png', name: 'Thane', size: [1536,1024], scale: 1.2, rows: [
    row('idle',0,143,128,[65,188,309,438,568,697,828,957,1088,1217,1345,1475],[0,126,249,373,502,632,762,892,1022,1152,1282,1410,1536]),
    row('run',143,248,239,[65,190,319,446,575,705,834,962,1094,1223,1353,1483],[0,127,254,383,512,641,770,899,1028,1158,1288,1418,1536]),
    row('attack',248,391,377,[68,181,293,416,559,716,883,1065,1220,1366,1481],[0,122,235,350,477,627,802,988,1159,1302,1422,1536]),
    row('hit',391,502,490,[66,181,301,426,590,748,906,1068],[0,121,240,363,511,672,830,991,1153]),
    row('death',502,625,605,[63,180,299,438,609,797],[0,122,241,365,536,709,900]),
    row('skillDash',625,751,731,[65,194,371,573,847,1052,1233],[0,128,264,445,655,932,1145,1337]),
    row('skillSwords',751,889,874,[65,175,296,427,593,789,986,1187],[0,120,239,362,500,684,883,1081,1298]),
    row('skillArc',889,1024,995,[65,175,292,417,543,680,838,1003,1199,1343,1466],[0,120,235,359,481,609,756,916,1104,1284,1401,1536])
  ], aliases: { skill1:'skillDash',skill2:'skillSwords',skill3:'skillArc' }, limitation: 'Gray RGB canvas already has alpha; low-alpha noise removed. Faded/effect-only dash and death-tail cells excluded.' },
  hendrik: {folder:'7.Hendrik',file:'preview_atlas_white_bgHendrik.png',name:'Hendrik',size:[1536,1024],scale:1.2,rows:[
    row('idle',0,148,131,[90,249,410,570,730,891,1050,1210,1371],[0,170,330,490,650,810,970,1130,1290,1450]),
    row('run',148,280,268,[102,261,421,582,744,908,1070,1235,1400],[0,190,349,511,675,837,1000,1164,1330,1536]),
    row('attack',280,409,396,[77,209,351,492,644,807,972,1142,1290,1444],[0,141,285,426,561,720,884,1066,1217,1363,1536]),
    row('hit',409,526,517,[87,226,363,502,654,812,975],[0,158,296,431,574,730,891,1050]),
    row('death',526,661,644,[82,219,357,505,649,773,903,1042],[0,153,293,428,575,717,846,976,1120]),
    row('skillShield',661,782,763,[87,220,355,497,637,775,917,1079,1268,1453],[0,155,289,425,566,706,842,1000,1166,1378,1536]),
    row('skillSlam',782,905,879,[81,226,393,554,709],[0,151,308,478,630,791])
  ],aliases:{skill1:'skillShield',skill2:'skillSlam'},limitation:'Slam row ends before detached rocks; bottom VFX-only row excluded.'},
  rowan: {folder:'8.Rowan',file:'preview_atlas_white_bgRowan.png',name:'Rowan',size:[830,1024],scale:1,rows:[
    row('idle',0,210,191,[79,232,392,559,723],[0,158,316,477,641,811]),
    row('run',210,382,367,[76,205,333,462,591,722],[0,145,273,403,531,663,811]),
    row('attack',382,548,532,[66,186,305,428,567,724],[0,126,247,375,508,672,811]),
    row('skillStaff',548,723,702,[69,184,300,413,526,639,756],[0,125,242,357,471,585,703,822]),
    row('hit',723,877,861,[65,204,331,449,595],[0,132,271,389,525,667]),
    row('death',877,1024,996,[59,187,338,509,704],[0,126,268,418,614,819])
  ],aliases:{skill1:'skillStaff'},limitation:'Right-edge partial effects excluded; only the visible staff action is available for skills.'},
  gwyneth:{folder:'9.Gwyneth',file:'preview_atlas_white_bgGwyneth.png',name:'Gwyneth',size:[1536,1024],scale:1.2,rows:[
    row('idle',0,143,132,[61,180,298,417,535,653,773,890,1009,1128],[0,126,244,363,481,599,718,837,954,1073,1193]),
    row('run',143,271,260,[65,184,303,420,537,655,773,890,1008,1156],[0,123,243,362,480,597,714,833,951,1070,1222]),
    row('attack',271,403,393,[60,172,288,416,546,672,796,933,1053,1182,1296],[0,124,242,369,493,621,746,870,1007,1118,1244,1370]),
    row('skillVolley',403,535,519,[58,174,286,407,521,656,798,940,1085,1240],[0,122,240,354,473,600,739,875,1015,1158,1318]),
    row('skillFlame',535,671,655,[51,163,284,413,537,674,811,996,1158,1309,1436],[0,112,231,353,478,608,747,922,1085,1231,1362,1536]),
    row('skillPillar',671,789,772,[56,170,278,386,501,615,757],[0,112,222,335,445,555,681,828]),
    row('hit',789,903,885,[56,168,280,395,508,622,744],[0,112,225,337,450,564,680,820]),
    row('death',903,1024,1003,[55,171,287,437,594,778],[0,113,225,348,518,677,875])
  ],aliases:{skill1:'skillVolley',skill2:'skillFlame',skill3:'skillPillar'},limitation:'Projectile/target/pillar VFX-only cells excluded.'},
  rosaline:{folder:'10.Rosaline',file:'rosaline_preview_atlas_white_bgRosaline.png',name:'Rosaline',size:[1536,1024],scale:1.15,rows:[
    row('idle',0,157,145,[71,213,353,493,632,774,915,1054,1194,1336],[0,145,285,425,566,706,846,986,1126,1266,1410]),
    row('run',157,322,309,[76,218,360,503,645,785,925,1067,1208,1349],[0,148,290,433,575,716,857,998,1139,1280,1425]),
    row('attack',322,480,465,[70,210,354,495,636,777,919,1057,1244,1384],[0,145,285,427,568,710,851,994,1180,1320,1460]),
    row('skillTea',480,644,628,[69,209,345,479,615,756,890,1036,1230,1383],[0,143,282,418,551,687,823,964,1166,1320,1460]),
    row('hit',644,788,772,[66,202,337,469,599,733,871,1014,1144,1278],[0,133,270,403,536,671,804,941,1080,1213,1347]),
    row('death',788,921,906,[67,198,335,463,584,731,887,1062],[0,130,265,398,514,658,809,983,1146])
  ],aliases:{skill1:'skillTea'},limitation:'Bottom loose crockery and aura-only effects excluded.'},
  cecilia:{folder:'11.Cecilia',file:'reference_review_white_bgCecilia.png',name:'Cecilia',size:[1400,1560],scale:0.13,rows:[
    row('idle',100,1445,1417,[793],[75,1265])
  ],aliases:{attack:'idle',hit:'idle',death:'idle',skill1:'idle'},limitation:'STATIC REFERENCE ONLY: one portrait, no authored animation. All action clips explicitly alias the static idle; no synthetic animation or skill claimed.'},
  rigby:{folder:'12.Rigby',file:'preview_atlas_white_bgRigby.png',name:'Rigby',size:[1536,1024],scale:1.3,rows:[
    row('idle',0,116,104,[65,184,303,423,543,663,783,904,1024,1143,1264,1384],[0,124,244,364,484,604,724,844,964,1084,1204,1324,1445]),
    row('run',116,237,221,[71,193,315,437,560,684,807,930,1051,1177,1299],[0,136,258,379,501,624,747,871,994,1116,1241,1365]),
    row('attack',237,375,360,[66,185,307,430,556,680,804,928,1051,1174,1296,1421],[0,126,249,373,496,620,745,869,993,1118,1241,1364,1536]),
    row('hit',375,478,463,[66,193,316,440,565,692,818,942],[0,130,254,379,503,628,756,883,1001]),
    row('death',478,577,558,[64,188,317,449,583,711,850,982,1118,1253,1395],[0,127,254,384,518,647,783,918,1051,1184,1318,1465]),
    row('skillBarrel',577,697,684,[62,186,307,434],[0,124,247,372,497]),
    row('skillDrink',697,797,783,[61,182,300,416,519,625,741,856,988],[0,122,242,359,473,574,684,800,915,1042]),
    row('skillSpit',797,906,882,[62,175,285,402,514,632,753,866],[0,119,230,343,458,573,695,812,991]),
    row('skillRoll',906,1024,1002,[62,178,294,413,531,649,768,891],[0,118,236,355,472,590,711,828,953])
  ],aliases:{skill1:'skillBarrel',skill2:'skillDrink',skill3:'skillSpit',skill4:'skillRoll'},limitation:'Rolling barrel/projectile/explosion-only cells excluded; barrel skill retains only four character windup poses.'},
  oscar:{folder:'13.Oscar',file:'preview_atlas_white_bgOscar.png',name:'Oscar',size:[1536,657],scale:1,rows:[
    row('idle',0,202,177,[80,208,335,463,588,716,842,969,1095,1221,1348,1474],[0,144,272,400,527,653,780,907,1032,1158,1284,1411,1536]),
    row('run',202,350,322,[93,247,402,553,705,860,1014,1168,1320,1477],[0,168,321,476,629,781,935,1089,1241,1396,1536]),
    row('hit',350,510,493,[80,216,358,502,658,827,1001],[0,147,288,427,580,745,914,1080]),
    row('death',510,657,618,[82,227,365,506,651,816,997,1194],[0,152,296,434,579,731,912,1094,1285])
  ],aliases:{attack:'idle',skill1:'idle'},limitation:'No attack/skill action supplied: attack and skill1 explicitly alias idle. Death first pose is head-cropped in original; excluded by importer frame selection.',drop:{death:[0]}},
  eluard:{folder:'14.Eluard',file:'preview_atlas_white_bgEluard.png',name:'Eluard',size:[4032,5760],scale:0.14,rows:[
    row('idle',0,1420,1305,[720],[110,1220])
  ],aliases:{attack:'idle',hit:'idle',death:'idle',skill1:'idle'},limitation:'STATIC REFERENCE ONLY: supplied 3x4 sheet repeats one portrait, not action animation. Keep one full portrait; actions explicitly alias static idle.'},
  'eluard-awakened':{folder:'15.EluardAwakend',file:'preview_atlas_white_bgEluardAwakend.png',name:'Eluard - Catalyst of Fate',size:[1536,1024],scale:1.1,rows:[
    row('idle',0,144,132,[81,177,274,370,466,562,659,757,852],[20,129,225,322,418,514,611,708,805,902]),
    row('run',144,254,241,[76,172,268,366,463,560,659,757,854],[15,124,220,317,414,511,609,708,805,904]),
    row('attack',254,361,345,[62,158,256,350,447,557,668,782],[10,111,208,305,401,513,626,739,851]),
    row('hit',361,461,445,[57,152,248,340,431,523,617,723],[10,102,199,294,386,479,570,672,780]),
    row('death',361,461,445,[57,152,248,340,431,523,617,723,833,941,1045],[10,102,199,294,386,479,570,672,780,888,996,1099]),
    row('skillFate',461,602,590,[59,171,284,410,557,729,937],[10,110,226,349,490,659,871,1106]),
    row('skillHourglass',602,730,714,[58,173,293,426,566,739,936],[10,115,238,365,503,675,870,1107]),
    row('skillCards',730,864,846,[59,177,295,423,565,742,929],[10,116,236,361,502,674,870,1113]),
    row('skillDome',864,1024,990,[59,159,263,401,579,776,999],[10,111,210,331,492,684,892,1112])
  ],aliases:{skill1:'skillFate',skill2:'skillHourglass',skill3:'skillCards',skill4:'skillDome'},limitation:'Hit uses standing/crouch portion of shared hit/death row; full row used for death. Right-side VFX-only columns excluded.'},
  peggy:{folder:'16.Peggy',file:'preview_atlas_white_bgPeggy.png',name:'Peggy',size:[1010,1024],scale:1.4,rows:[
    row('idle',0,116,103,[79,191,304,416,529,641,753,865,978],[26,136,248,361,473,585,697,809,921,1010]),
    row('run',116,228,216,[80,194,306,418,530,643,755,868,980],[23,137,250,362,475,587,699,812,924,1010]),
    row('attack',228,333,322,[81,192,307,420,533,647,760],[24,137,250,363,476,589,703,793]),
    row('hit',333,442,427,[79,191,308,424,583,710,839],[25,136,251,365,479,645,773,901]),
    row('death',442,546,530,[77,191,308,434,555,687],[24,134,249,366,491,621,753]),
    row('skillGuards',546,656,637,[63,154,251,356],[13,111,205,303,409]),
    row('skillCrown',656,768,751,[56,153,249,355,467,615],[9,104,201,300,410,529,683]),
    row('skillCarriage',768,883,865,[59,148,247],[10,104,200,298]),
    row('skillGift',883,1024,976,[57,149,243],[9,103,198,291])
  ],aliases:{skill1:'skillGuards',skill2:'skillCrown',skill3:'skillCarriage',skill4:'skillGift'},limitation:'Guards/carriage/gift-only cells are separate entities, excluded. Guard, carriage and gift skills retain only visible character windup poses.'},
  walker:{folder:'17.Walker',file:'Cowboy Gunslinger Sprite Atlas.png',name:'Walker',size:[1536,1024],scale:1.1,rows:[
    row('idle',0,144,127,[65,182,299,414,530,646,761,877,993,1109,1225,1341,1458],[8,123,240,356,472,588,703,819,935,1051,1167,1283,1399,1536]),
    row('run',144,268,253,[78,223,357,484,614,739,866,994,1117,1272,1431],[7,151,291,420,548,676,804,932,1056,1186,1354,1536]),
    row('attack',268,393,382,[69,202,310,418,535,651,766,889,1012,1171,1326,1449],[10,139,262,370,487,600,718,841,965,1124,1280,1395,1536]),
    row('hit',393,511,503,[65,174,288,415,546,689,829],[10,120,231,344,476,614,757,901]),
    row('death',511,630,613,[65,204,342,470,616,737,868,1014,1145,1282,1430],[10,132,271,407,536,678,804,938,1079,1210,1350,1536]),
    row('skillAim',630,735,722,[63,178,305,438,622,795],[9,124,243,369,553,721,1026]),
    row('skillDash',735,818,804,[64,195,324,456,608,757,891,1044,1259,1444],[8,130,260,391,527,686,822,956,1123,1357,1536]),
    row('skillBarrage',818,925,910,[65,182,303,419,531,650,767,927,1130,1307,1450],[8,124,244,360,477,594,713,846,1058,1234,1388,1536])
  ],aliases:{skill1:'skillAim',skill2:'skillDash',skill3:'skillBarrage'},limitation:'Hit uses first seven upright/crouch poses of shared action/death row. Detached projectile/impact-only and bottom VFX rows excluded.'},
  morrow:{folder:'18.Morrow',file:'morrow_preview_atlas_white_bgMorrow.png',name:'Morrow',size:[1536,1024],scale:1.15,rows:[
    row('idle',0,147,135,[75,210,346,481,618,753,891,1029,1167,1306,1447],[0,143,279,415,551,687,824,962,1100,1237,1376,1536]),
    row('run',147,275,262,[78,223,361,497,634,773,909,1046,1187,1325],[0,153,291,429,566,705,842,980,1118,1257,1408]),
    row('attack',275,415,399,[73,216,359,496,634,776,908],[0,144,288,429,565,704,854,1016]),
    row('hit',415,541,526,[75,218,361,502,645,786,942],[0,145,290,432,575,716,861,1016]),
    row('death',541,676,654,[59,160,270,380,486,595,721,851,987],[0,112,218,329,432,541,664,790,922,1062])
  ],aliases:{skill1:'attack',skill2:'attack',skill3:'attack'},limitation:'No character skill rows: skills explicitly reuse the sole cast/attack row. Portal, dome and explosion rows are VFX-only and excluded. Faded death tail excluded.'},
  scarlet:{folder:'19.Scarlet',file:'preview_atlas_white_bgScarlet.png',name:'Scarlet',size:[1536,1024],scale:1.1,rows:[
    row('idle',0,144,135,[75,236,396,557,716,876,1037],[0,160,321,480,640,801,961,1122]),
    row('run',144,264,252,[78,242,408,570,733,895],[0,164,329,493,655,818,981]),
    row('attack',264,394,383,[63,210,341,476,602,753,903,1057,1218],[0,135,279,411,541,684,835,990,1153,1318]),
    row('hit',394,512,499,[78,229,378,528,677,824],[0,155,303,453,603,754,902]),
    row('death',512,625,612,[79,232,412,577,752,944,1129],[0,158,323,494,665,854,1038,1219]),
    row('skillRitual',625,770,746,[79,255,450,643,839,1056],[0,171,358,552,748,950,1158]),
    row('skillBolt',770,882,865,[60,196,343,490,661],[0,127,271,416,568,785]),
    row('skillStorm',882,1024,995,[65,212,399,602,817,1055,1312],[0,141,301,502,710,941,1178,1458])
  ],aliases:{skill1:'skillRitual',skill2:'skillBolt',skill3:'skillStorm'},limitation:'Detached bolts and ritual explosion-only cells excluded.'},
  'thane-awakened':{folder:'20.Thane',file:'preview_atlas_white_bgThane.png',name:'Thane - The Veiled Wind',size:[1536,1024],scale:1.4,rows:[
    row('idle',0,109,94,[407,511,614,718,822,926,1029,1133,1237],[345,461,564,668,771,875,979,1082,1185,1289]),
    row('run',109,215,197,[394,478,568,659,749,842,935,1030,1124,1222,1316],[343,434,522,614,705,796,889,982,1075,1173,1271,1362]),
    row('attack',215,320,300,[393,503,608,714,824,943,1074,1206,1314,1427],[343,450,557,663,773,891,1028,1158,1262,1368,1483]),
    row('skillThrust',320,420,401,[395,504,608,716,830,942,1054,1168,1282,1398],[343,451,557,665,774,886,998,1111,1223,1338,1461]),
    row('skillWind',420,529,505,[395,507,633,755,856,955,1084,1194,1330,1469],[343,450,562,694,807,905,1011,1140,1255,1400,1536]),
    row('skillWhirl',529,646,617,[393,505,617,729,846,968,1091],[343,450,563,665,782,904,1027,1154]),
    row('hit',646,756,737,[392,497,602,706,795,876,977,1060],[343,447,551,654,751,836,922,1018,1107]),
    row('death',756,870,847,[406,517,633,748,864,1002,1153],[343,462,576,690,804,934,1071,1225])
  ],aliases:{skill1:'skillThrust',skill2:'skillWind',skill3:'skillWhirl'},limitation:'Portraits/turnarounds in left panel excluded; bottom VFX-only strip excluded. Wind row overlapping trails trimmed at measured gutters.'},
  sonja:{folder:'21.Sonja',file:'preview_atlas_white_bgSonja.png',name:'Sonja',size:[6144,3072],scale:1,rows:[
    row('idle',0,384,286,[166,549,934,1318,1702,2086,2470,2854,3237,3622,4006,4390],[90,410,793,1178,1562,1946,2330,2714,3098,3481,3866,4250,4505]),
    row('attack',384,768,672,[166,549,934,1318,1702,2086,2470,2854,3237,3622,4006,4390,4774,5158,5542,5926],[83,353,734,1118,1502,1886,2270,2654,3038,3422,3806,4190,4574,4958,5342,5726,6100]),
    row('hit',768,1152,1056,[166,549,934,1318,1702,2086,2470,2854,3237,3622],[89,353,734,1118,1502,1886,2270,2654,3038,3422,3747]),
    row('death',1152,1536,1440,[166,549,934,1318,1702,2086,2470,2854,3237,3622,4006,4390,4774,5158,5542,5926],[84,355,735,1119,1503,1887,2271,2655,3039,3423,3807,4191,4575,4959,5343,5727,6144]),
    row('skillRoses',1536,1920,1824,[166,549,934,1318,1702,2086,2470,2854,3237,3622,4006,4390,4774,5158,5542,5926],[0,353,737,1121,1505,1889,2273,2657,3041,3425,3809,4193,4577,4961,5345,5729,6144]),
    row('skillAura',1920,2304,2208,[166,549,934,1318,1702,2086,2470,2854,3237,3622,4006,4390,4774,5158,5542,5926],[64,353,737,1121,1505,1889,2273,2657,3041,3425,3809,4193,4577,4961,5345,5729,6144]),
    row('skillShadow',2304,2688,2592,[166,549,934,1318,1702,2086,2470,2854,3237,3622,4006,4390,4774,5158,5542,5926],[66,353,737,1121,1505,1889,2273,2657,3041,3425,3809,4193,4577,4961,5345,5729,6144]),
    row('skillRoseBlade',2688,3072,2976,[166,549,934,1318,1702,2086,2470,2854,3237,3622,4006,4390,4774,5158,5542,5926],[70,353,737,1121,1505,1889,2273,2657,3041,3425,3809,4193,4577,4961,5345,5729,6144])
  ],aliases:{skill1:'skillRoses',skill2:'skillAura',skill3:'skillShadow',skill4:'skillRoseBlade'},limitation:'16-column output required. Sparse source includes embedded purple target/effect art; retained only within character-containing crops. Wide aura margins clip at cell boundary while body scale stays fixed.'},
  palmer:{folder:'22.Palmer',file:'preview_atlas_white_bgPalmer.png',name:'Palmer',size:[1536,1024],scale:1.1,rows:[
    row('idle',0,148,133,[76,226,376,527,678,829,980,1130,1282,1434],[0,151,301,452,603,754,905,1055,1206,1358,1536]),
    row('run',148,288,274,[78,242,402,563,723,885,1048,1215,1408],[0,158,320,480,642,803,966,1136,1311,1536]),
    row('attack',288,429,414,[71,225,380,536,674,800,975,1139,1332,1468],[0,148,303,456,610,744,917,1077,1285,1409,1536]),
    row('hit',429,559,543,[79,207,323,450,583,706,843,979,1111,1251,1401],[0,145,265,388,520,646,777,911,1048,1177,1325,1536]),
    row('death',559,684,667,[82,206,330,442,574,716,874,1050,1215,1415],[0,146,271,386,503,648,786,958,1134,1320,1536])
  ],aliases:{skill1:'attack',skill2:'attack',skill3:'attack'},limitation:'Supplied support-skill rows are effect-only; skills explicitly reuse staff action, not claimed as authored support animations.'}
};
// A disjoint crop skips the translucent, characterless afterimage between dash poses.
SPECS.thane.rows.find(r=>r.name==='skillDash').bounds=[[0,128],[128,264],[264,445],[445,655],[782,932],[932,1145],[1145,1337]];

/** Extract connected components, dropping detached fragments of adjacent crop cells. */
function extract(image, r, fi) {
  const left = Math.max(0,r.bounds[fi][0]), right = Math.min(image.w,r.bounds[fi][1]);
  const cw=right-left,ch=r.end-r.y,seen=new Uint8Array(cw*ch),components=[];
  for(let sy=0;sy<ch;sy++) for(let sx=0;sx<cw;sx++) {
    const first=sy*cw+sx;
    if(seen[first] || image.rgba[((sy+r.y)*image.w+left+sx)*4+3]===0) continue;
    const pixels=[first]; seen[first]=1; let edge=false;
    for(let k=0;k<pixels.length;k++) {
      const i=pixels[k],x=i%cw,y=Math.floor(i/cw); if(x===0||x===cw-1||y===0||y===ch-1)edge=true;
      for(const n of [i-1,i+1,i-cw,i+cw]) {
        if(n<0||n>=seen.length||seen[n]||Math.abs(n%cw-x)>1)continue;
        if(!image.rgba[((r.y+Math.floor(n/cw))*image.w+left+n%cw)*4+3])continue;
        seen[n]=1;pixels.push(n);
      }
    }
    components.push({pixels,edge});
  }
  const largest=Math.max(0,...components.map(c=>c.pixels.length));
  const kept=components.filter(c=>c.pixels.length>=4 && !(c.edge&&c.pixels.length<largest));
  const points=[]; let pruned=0;
  for(const c of components)if(!kept.includes(c))pruned+=c.pixels.length;
  for(const c of kept)for(const i of c.pixels)points.push([left+i%cw,r.y+Math.floor(i/cw)]);
  if(points.length<64)throw Error('Empty character crop '+r.name+'/'+fi);
  return {points,pruned};
}
/** Create transparent 256px cells, preserving one fixed body scale and ground per hero. */
function pack(image,spec) {
  let speckle=0;for(let p=3;p<image.rgba.length;p+=4)if(image.rgba[p]<=12){image.rgba[p]=0;speckle++;}
  const removed=removeBackground(image), frames=spec.rows.map(r=>r.centers.map((_,fi)=>extract(image,r,fi)));
  // Fixed body scale is more important than preserving an oversize detached VFX tail.
  // Clip long rays/aura margins to the cell rather than shrinking every character pose.
  const scale=spec.scale;let pruned=0,clipped=0;
  for(let ri=0;ri<frames.length;ri++)for(let fi=0;fi<frames[ri].length;fi++){
    const r=spec.rows[ri],f=frames[ri][fi];pruned+=f.pruned;
    for(const [x,y]of f.points){const dx=ANCHOR+(x-r.centers[fi])*scale,dy=GROUND+(y-r.ground)*scale;
      if(dx<0||dx>=CELL||dy<0||dy>=CELL)clipped++;
    }
  }
  const cols=Math.max(12,...spec.rows.map(r=>r.centers.length)),width=cols*CELL,height=spec.rows.length*CELL;
  const out=Buffer.alloc(width*height*4),clips={},counts={};let total=0;
  for(let ri=0;ri<frames.length;ri++){
    const r=spec.rows[ri],selected=frames[ri].map((f,i)=>({f,i})).filter(v=>!(spec.drop?.[r.name]||[]).includes(v.i));
    clips[r.name]={y:ri*CELL,count:selected.length};counts[r.name]=selected.length;total+=selected.length;
    for(let fi=0;fi<selected.length;fi++){
      const {f,i}=selected[fi],mask=new Set(f.points.map(([x,y])=>y*image.w+x));
      // Inverse nearest sampling avoids holes on scaled-up character silhouettes.
      for(let dy=0;dy<CELL;dy++)for(let dx=0;dx<CELL;dx++){
        const x=Math.round(r.centers[i]+(dx-ANCHOR)/scale),y=Math.round(r.ground+(dy-GROUND)/scale);
        if(x<0||y<0||x>=image.w||y>=image.h||!mask.has(y*image.w+x))continue;
        const from=(y*image.w+x)*4,to=((ri*CELL+dy)*width+fi*CELL+dx)*4;
        image.rgba.copy(out,to,from,from+4);
      }
    }
  }
  for(const [alias,target]of Object.entries(spec.aliases||{})){
    if(!clips[target])throw Error('Unknown alias target '+target);clips[alias]={...clips[target]};
  }
  for(const needed of ['idle','attack','hit','death','skill1'])if(!clips[needed])throw Error('Missing '+needed);
  return {png:encodePNG(width,height,out),width,height,cols,clips,counts,scale,total,removed,speckle,pruned,clipped};
}
/** Import only approved derived outputs; never write originals or existing project integrations. */
function run(sourceRoot,outRoot) {
  if(!sourceRoot||!outRoot)throw Error('Usage: node import-expanded.cjs <Heros folder> <oathbound folder>');
  const manifest={},evidence=['slug\tsource\tsource_sha256\tsource_dimensions\tderived\tderived_sha256\tderived_dimensions\tcolumns\tcell\tanchor_x\tground_y\tscale\tphysical_clip_counts\taliases\tbackground_pixels_removed\tlow_alpha_pixels_cleared\tneighbor_fragment_pixels_pruned\toversize_source_pixels_clipped\tlimitations'];
  for(const [slug,spec]of Object.entries(SPECS)){
    const source=path.join(sourceRoot,spec.folder,spec.file),bytes=fs.readFileSync(source),sourceHash=crypto.createHash('sha256').update(bytes).digest('hex'),image=decodePNG(bytes);
    if(image.w!==spec.size[0]||image.h!==spec.size[1])throw Error('Source size mismatch '+slug);
    const packed=pack(image,spec),file='expanded-'+slug+'.png',src='assets/'+file,derivedHash=crypto.createHash('sha256').update(packed.png).digest('hex');
    fs.writeFileSync(path.join(outRoot,'assets',file),packed.png);
    manifest[slug]={name:spec.name,src,data:'data:image/png;base64,'+packed.png.toString('base64'),clips:packed.clips,
      metadata:{cell:CELL,anchorX:ANCHOR,groundY:GROUND,columns:packed.cols,scale:packed.scale,sourceHash,sourceDimensions:spec.size,derivedHash,
        aliases:spec.aliases||{},limitation:spec.limitation,sourceRows:spec.rows,rights:'UNKNOWN; local user-supplied, not for publication'}};
    evidence.push([slug,source.replaceAll('\\','/'),sourceHash,spec.size.join('x'),src,derivedHash,packed.width+'x'+packed.height,packed.cols,CELL,ANCHOR,GROUND,packed.scale,
      JSON.stringify(packed.counts),JSON.stringify(spec.aliases||{}),packed.removed,packed.speckle,packed.pruned,packed.clipped,spec.limitation+' Oversize effect margins clipped to fixed-scale cells.'].join('\t'));
    console.log(slug+'\t'+packed.width+'x'+packed.height+'\t'+packed.total+' character frames\t'+JSON.stringify(packed.counts));
  }
  fs.writeFileSync(path.join(outRoot,'expanded-sprites.js'),'// PROTOTYPE - NOT FOR PRODUCTION\n// Offline derived local user-supplied art. Rights UNKNOWN; not for publication.\n// Inspect metadata.aliases and metadata.limitation: aliases are not authored full skills.\nwindow.EXPANDED_SPRITES='+JSON.stringify(manifest)+';\n');
  fs.writeFileSync(path.join(outRoot,'evidence','expanded-import.tsv'),evidence.join('\n')+'\n');
  return manifest;
}
if(require.main===module)run(...process.argv.slice(2));
module.exports={SPECS,extract,pack,run};
