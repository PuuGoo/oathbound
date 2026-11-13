// PROTOTYPE - NOT FOR PRODUCTION
// Independent hero-kit logic. Base effects: afk.guide/estrilda and /belinda.
// Cooldowns, durations omitted by sources, targeting geometry and unlock policy are prototype adaptations.
(function(root){
'use strict';
const KITS={
  walker:[
    {id:'saloonBlast',name:'Saloon Blast',animation:'skillArc',summary:'Hủy nạp đạn,8s chỉ đánh thường tăng cường:80%đạn chính+70%vùng+6ghém25%khôngcrit. Bình thường4ghém.',cooldown:'saloonCooldown',delay:'saloonDelay',support:true},
    {id:'spittoonSmack',name:'Spittoon Smack',animation:'skillShield',summary:'Cận chiến140%,choáng4s nếu khống chế thật rồi bắn240% vào đích. Bị ngắt trước bắn thì hủy.',cooldown:'spittoonCooldown',delay:'spittoonDelay',range:'spittoonRange'},
    {id:'gunslinger',name:'Gunslinger',animation:'skill',summary:'Hai đạn360% vào2địch tỷ lệHP thấp nhất. Đích dưới10%HP thêm6%crit riêng đạn.',cooldown:'gunslingerCooldown',delay:'gunslingerDelay',support:true},
    {id:'oldFaithful',name:'Old Faithful',animation:'attack',summary:'Mỗi chí mạng thật tích2%hệ sốcrit,cap60%; chỉ đòncrit được hưởng,ghémkhôngtích.',passive:true}
  ],
  peggy:[
    {id:'dutyBound',name:'Duty Bound',animation:'skillAura',summary:'Hai hộ vệ80%stats, đánh/bảo vệ phụ thuộc chủ. Tăng45%nhịp/giảm50%damage12s; hết hộ vệ gọi1,350%công hộ vệ vàchoáng3s gần.',cooldown:'dutyCooldown',delay:'dutyDelay',support:true},
    {id:'royalScroll',name:'Royal Scroll',animation:'skill',summary:'Hồi220%công cho hộ vệ còn sống và1đồng minh tỷ lệHP thấp nhất.',cooldown:'scrollCooldown',delay:'scrollDelay',support:true},
    {id:'royalGuards',name:'Royal Guards',animation:'skillShield',summary:'Mỗi hộ vệ tạo khiên20%HP hiện tại cho mình vàđồng minh gần nhất,8s; trùng đích refreshmax.',cooldown:'royalShieldCooldown',delay:'royalShieldDelay',support:true},
    {id:'royalMarksmen',name:'Royal Marksmen',animation:'skillArc',summary:'Năm đạn70%công vào địch gần nhất; suy công/làmchậm10%7s thayaccuracy/haste. Ở nửa sân địch có xác suấttrượt theo khoảngcách≤30%.',cooldown:'marksmenCooldown',delay:'marksmenDelay',support:true}
  ],
  'eluard-awakened':[
    {id:'fracturedReality',name:'Fractured Reality',animation:'skillArc',summary:'450% công toàn địch và10Causal Drift; mỗi5tầng gây150% và1tiến trình. Đủ50:150%/3s và phá khiên.',cooldown:'fracturedCooldown',delay:'fracturedDelay',support:true},
    {id:'fatesCorrection',name:'Fate’s Correction',animation:'skillAura',summary:'Chuyển thể chỉ kiểm tra crit: Proficiency/Dissolve proxy đủ thì sửa lần trượt thành crit, +2drift. Giới hạn5/người,10/toàn đội mỗi2s.',reactive:true},
    {id:'astralDesolation',name:'Astral Desolation',animation:'skill',summary:'260% toàn địch; sắc lệnh8s gây150% mỗi giây, tước1% công/giáp/HP gốc tối đa50%. Boss không mấtmaxHP; projection là bản ghi.',cooldown:'astralCooldown',delay:'astralDelay',support:true},
    {id:'negateReality',name:'Negate Reality',animation:'skillShield',summary:'Hai lần/trận vô hiệu đòn chí tử cho đồng minh; ẩn an toàn0.8s, +30%Proficiency proxy. Không hồi sinh.',reactive:true}
  ],
  eluard:[
    {id:'sanctimony',name:'Sanctimony',animation:'skillShield',summary:'Tiêu khiên thần còn lại gây20% giá trị khiên lên toàn địch, cap500% công; tạo lại khiên180% HP tối đa.',cooldown:'sanctimonyCooldown',delay:'sanctimonyDelay',support:true},
    {id:'divineMiracle',name:'Divine Miracle',animation:'skillAura',summary:'Đầu trận khiên thần150% HP; vỡ choáng8s rồi tái tạo. Không có khiên thần nhận350% damage.',reactive:true},
    {id:'prayerProtection',name:'Prayer of Protection',animation:'skillAura',summary:'Cầu nguyện3s chuyển thể: đồng minh đi xa nhất về phía địch miễn damage; control/chết/giam ngắt.',cooldown:'prayerCooldown',delay:'prayerDelay',support:true},
    {id:'eluardJudgment',name:'Judgment',animation:'skillArc',summary:'Niệm1s rồi220% công toàn địch; mỗi đồng minh địch đã hạ tăng50% damage. Control ngắt trước release.',cooldown:'eluardJudgmentCooldown',delay:'eluardJudgmentDelay',support:true}
  ],
  oscar:[
    {id:'auraHaste',name:'Aura of Haste',animation:'skillArc',summary:'270% công vùng quanh mình;4dao và vùng11s. Chỉ Oscar đứng trong vùng được +100% nhịp (chuyển Haste).',cooldown:'auraHasteCooldown',delay:'auraHasteDelay',support:true},
    {id:'fineCuts',name:'Fine Cuts',animation:'skill',summary:'Ném dao180% công vào2địch tỷ lệ HP thấp nhất trong380px; chạm mới gây damage và để dao trên đất.',cooldown:'fineCutsCooldown',delay:'fineCutsDelay',support:true},
    {id:'sliceDice',name:'Slice and Dice',animation:'skillShield',summary:'Tiêu1dao riêng có địch gần, dịch chuyển tới dao và chém200% công vùng gần. Không có dao thì chờ.',cooldown:'sliceDiceCooldown',delay:'sliceDiceDelay',support:true},
    {id:'unfazed',name:'Unfazed',animation:'skillAura',summary:'Xóa debuff được hỗ trợ; +25% crit và giảm20% damage thay Dodge95, tới khi trúng khống chế.',cooldown:'unfazedCooldown',delay:'unfazedDelay',support:true}
  ],
  rigby:[
    {id:'barrelBomb',name:'Barrel Bomb',animation:'skillArc',summary:'Thùng bay150% công; sau0.5s nổ260% vùng cố định, đốt60%/giây trong12s. Nhịp/radius chuyển thể.',cooldown:'barrelCooldown',delay:'barrelDelay',range:'barrelRange'},
    {id:'fireBreath',name:'Fire Breath',animation:'skill',summary:'180% công địch gần phía trước; giảm15% damage6s thay accuracy80, không có hệ accuracy.',cooldown:'fireBreathCooldown',delay:'fireBreathDelay',range:'fireBreathRange'},
    {id:'drunkenFrenzy',name:'Drunken Frenzy',animation:'skillAura',summary:'Mỗi lần uống giảm14% damage và tăng25% nhịp;3tầng thêm120% nhịp8s rồi reset. Haste đổi thành tỷ lệ prototype.',cooldown:'frenzyCooldown',delay:'frenzyDelay',support:true},
    {id:'wellRested',name:'Well Rested',animation:'skillShield',summary:'Sau khi3tầng Frenzy hết: hồi5% HP tối đa mỗi giây trong12s, không hồi sinh.',reactive:true}
  ],
  cecilia:[
    {id:'judgementDay',name:'Judgement Day',animation:'skillArc',summary:'300% công vào địch nhiều dấu riêng nhất; thêm1 dấu, từ3 dấu choáng1.5s. Đủ5 dấu trước đòn: thêm300% (diễn giải prototype).',cooldown:'judgementCooldown',delay:'judgementDelay',support:true},
    {id:'bladePurification',name:'Blade of Purification',animation:'skill',summary:'3 nhát ×90% công; mỗi dấu có sẵn tăng10% damage. Thêm1 dấu mỗi lần dùng, tối đa5.',cooldown:'purifyingCooldown',delay:'purifyingDelay',range:'meleeRange'},
    {id:'atonement',name:'Atonement',animation:'skillShield',summary:'Một lần đầu trận: xuất hiện sau địch đối diện vị trí,3 nhát ×115% và3 dấu. Chờ0.6s chuyển thể.',reactive:true},
    {id:'devilTrap',name:'Devil Trap',animation:'skillAura',summary:'Vòng cố định6s quanh điểm thi triển: địch trong vòng giảm60% công; lần đầu bước ra nhận320%. Hình học/thời lượng chuyển thể.',cooldown:'devilTrapCooldown',delay:'devilTrapDelay',support:true}
  ],
  rosaline:[
    {id:'motivation',name:'Motivation',animation:'skillAura',summary:'Theo đồng minh lực chiến cao nhất; giảm40% damage cho mình. Chiêu chuyển thể giảm3s hồi chiêu người theo, không energy.',cooldown:'motivationCooldown',delay:'motivationDelay',support:true},
    {id:'crazyCrockery',name:'Crazy Crockery',animation:'skill',summary:'Ném2 chén ×120% công vào đích người theo đang đánh; chạm mới gây damage/choáng0.5s.',cooldown:'crockeryCooldown',delay:'crockeryDelay',range:'crockeryRange'},
    {id:'afternoonTea',name:'Afternoon Tea',animation:'skillShield',summary:'Hồi150% công cho đồng minh đang theo, không hồi cả đội hay hồi sinh.',cooldown:'teaCooldown',delay:'teaDelay',support:true},
    {id:'springCleaning',name:'Spring Cleaning',animation:'skillArc',summary:'Quét4s: mỗi giây80% công quanh người theo; theo hàng sau thì đẩy lùi. Miễn damage khi quét; khống chế vẫn ngắt.',cooldown:'cleaningCooldown',delay:'cleaningDelay',support:true}
  ],
  gwyneth:[
    {id:'divineArrow',name:'Divine Arrow',animation:'skillArc',summary:'210% công lên địch ở nửa sân của họ; giảm15% damage 8s thay accuracy. Không tung khi nửa sân địch trống.',cooldown:'divineArrowCooldown',delay:'divineArrowDelay',support:true},
    {id:'flamingArrows',name:'Flaming Arrows',animation:'attack',summary:'Đạn thường60% hóa lửa:220% công và đốt40% công/giây trong5s. Không giảm hồi máu bản nâng cấp.',passive:true},
    {id:'lightningArrows',name:'Lightning Arrows',animation:'attack',summary:'Đạn thường60% hóa sét:220% công lan quanh đích; có thể kết hợp lửa, không cộng đôi damage chính.',passive:true},
    {id:'strengthInNumbers',name:'Strength In Numbers',animation:'skillAura',summary:'Không có địch gần: +25% chí mạng. Không thêm accuracy vì prototype không có hệ đó.',passive:true}
  ],
  rowan:[
    {id:'dazzle',name:'Dazzle',animation:'skillArc',summary:'4 đợt (prototype), mỗi 0.5s chọn 3 người: đồng minh +30% công 8s/+15% nhịp 3s thay energy; địch choáng 4s.',cooldown:'dazzleCooldown',delay:'dazzleDelay',support:true},
    {id:'avianAssault',name:'Avian Assault',animation:'skill',summary:'3 đòn ×60% vào địch gần nhất; giảm 15% damage gây ra 10s thay accuracy, không cướp energy (chuyển thể).',cooldown:'avianCooldown',delay:'avianDelay',range:'avianRange'},
    {id:'healthySupplies',name:'Healthy Supplies',animation:'skillAura',summary:'3 bình/trận: đồng minh gần dưới50% HP hồi30% HP tối đa; mỗi người chờ5s, không hồi sinh.',reactive:true},
    {id:'damageControl',name:'Damage Control',animation:'skillShield',summary:'Chuyển thể không energy: đòn mất hơn10% HP tối đa được giảm60%, hồi nội tại3s.',reactive:true}
  ],
  hendrik:[
    {id:'cripplingBlow',name:'Crippling Blow',animation:'skillArc',summary:'140% công vùng gần; choáng 1s +0.2s mỗi 10% HP thiếu, tối đa 4s (HP thiếu hiện tại).',cooldown:'cripplingBlowCooldown',delay:'cripplingBlowDelay',range:'cripplingBlowRadius'},
    {id:'shieldBash',name:'Shield Bash',animation:'skill',summary:'130% công một địch, đẩy lùi và choáng 1.5s.',cooldown:'shieldBashCooldown',delay:'shieldBashDelay',range:'meleeRange'},
    {id:'sacrificialShield',name:'Sacrificial Shield',animation:'skillShield',summary:'Một lần/trận: cứu đồng minh hàng sau khỏi đòn chí tử; nhận sát thương thay 10s. Không hồi sinh.',reactive:true},
    {id:'standfast',name:'Standfast',animation:'skillAura',summary:'Một lần/trận khi HP dưới 40%: thủ 10s, hồi 6% HP tối đa/giây, giảm 30% damage; dừng ở 90% HP.',reactive:true}
  ],
  thane:[
    {id:'eviscerate',name:'Eviscerate',animation:'skillArc',summary:'7 đòn ngẫu nhiên ×80% công; không nhận sát thương khi thi triển. Khống chế vẫn ngắt chiêu.',cooldown:'eviscerateCooldown',delay:'eviscerateDelay',range:'meleeRange'},
    {id:'lunge',name:'Lunge',animation:'skill',summary:'Lao đến địch, 120% công; bản thân +20% chí mạng trong 5s.',cooldown:'lungeCooldown',delay:'lungeDelay',range:'lungeRange'},
    {id:'execution',name:'Execution',animation:'skillShield',summary:'Sau 4 chí mạng: 2 đòn dẫn 40% (prototype), đòn cuối 80% công +15% HP tối đa đích.',cooldown:'executionCooldown',delay:'executionDelay',range:'meleeRange',requiresCrits:true},
    {id:'focus',name:'Focus',animation:'skillAura',summary:'Nội tại: +14% xác suất chí mạng. Không có hồi máu/năng lượng nâng cấp.',passive:true}
  ],
  lancer:[
    {id:'joust',name:'Joust',animation:'skill',summary:'5 đòn 60% + kết thúc 150%; đánh ngã.',cooldown:'joustCooldown',delay:'joustDelay',range:'joustRange'},
    {id:'royalCharge',name:'Royal Charge',animation:'skillArc',summary:'Lao xuyên, 200% công; đánh ngã; miễn khống chế khi lao.',cooldown:'royalChargeCooldown',delay:'royalChargeDelay',range:'royalChargeRange'},
    {id:'inspire',name:'Inspire',animation:'skillAura',summary:'Toàn đội +30% công trong 8 giây.',cooldown:'inspireCooldown',delay:'inspireDelay',support:true},
    {id:'ridicule',name:'Ridicule',animation:'skillShield',summary:'150% mục tiêu + 60% vùng gần; giảm 14% sát thương địch trong 6 giây.',cooldown:'ridiculeCooldown',delay:'ridiculeDelay',range:'ridiculeRange'}
  ],
  mage:[
    {id:'divineLight',name:'Divine Light',animation:'skillArc',summary:'4 đợt ánh sáng, mỗi đợt 110% công trong vùng.',cooldown:'divineLightCooldown',delay:'divineLightDelay',range:'divineLightRange'},
    {id:'divineRetribution',name:'Divine Retribution',animation:'skillShield',summary:'Đạn ánh sáng nổ khi chạm mục tiêu; 160% công vùng gần.',cooldown:'divineRetributionCooldown',delay:'divineRetributionDelay',range:'divineRetributionRange'},
    {id:'brilliance',name:'Brilliance',animation:'skillAura',summary:'Nội tại: +12% xác suất chí mạng.',passive:true},
    {id:'blessing',name:'Blessing',animation:'skill',summary:'Đồng minh công cao nhất: +15% công và +15% chí mạng.',cooldown:'blessingCooldown',delay:'blessingDelay',support:true}
  ],
  warden:[
    {id:'heavensProtection',name:"Heaven’s Protection",animation:'skillShield',summary:'Khiên toàn đội 500% công, tối đa 8s.',cooldown:'heavensProtectionCooldown',delay:'heavensProtectionDelay',support:true},
    {id:'divineStrike',name:'Divine Strike',animation:'attack',summary:'Sóng búa vùng gần 130% công, đánh ngã.',cooldown:'divineStrikeCooldown',delay:'divineStrikeDelay',range:'divineStrikeRange'},
    {id:'divineBlessing',name:'Divine Blessing',animation:'skillAura',summary:'Hồi 200% công cho đồng minh yếu máu; tăng phòng thủ 5s.',cooldown:'divineBlessingCooldown',delay:'divineBlessingDelay',support:true},
    {id:'blessedShield',name:'Blessed Shield',animation:'skillShield',summary:'Thủ thế 5s: giảm 65% sát thương nhận, miễn khống chế.',cooldown:'blessedShieldCooldown',delay:'blessedShieldDelay',support:true}
  ],
  ranger:[
    {id:'cripple',name:'Cripple',animation:'skill',summary:'Đánh dấu 8s: địch nhận thêm 15% sát thương; người kết liễu tăng nhịp (chuyển thể).',cooldown:'crippleCooldown',delay:'crippleDelay',support:true},
    {id:'barrage',name:'Barrage',animation:'skillArc',summary:'5 viên ×65% địch thấp HP; 5 viên ×10% địch công cao, làm chậm.',cooldown:'barrageCooldown',delay:'barrageDelay',range:'barrageRange'},
    {id:'lockOn',name:'Lock On',animation:'skill',summary:'Đánh dấu địch yếu máu 10s; đồng minh bắn trúng nhận tăng nhịp/chí mạng 3s.',cooldown:'lockOnCooldown',delay:'lockOnDelay',support:true},
    {id:'exploit',name:'Exploit',animation:'attack',summary:'Nội tại: Raine gây thêm sát thương theo máu mất của địch, tối đa 30%.',passive:true}
  ],
  healer:[
    {id:'purification',name:'Purification',animation:'skillArc',summary:'130% công toàn địch, xóa buff có lợi/khiên; không giải debuff đội bạn.',cooldown:'purificationCooldown',delay:'purificationDelay',support:true},
    {id:'abate',name:'Abate',animation:'skillAura',summary:'Giảm 35% nhịp đánh của một địch trong 6s.',cooldown:'abateCooldown',delay:'abateDelay',range:'abateRange'},
    {id:'confine',name:'Confine',animation:'skillShield',summary:'50% công vào địch công cao nhất; nhốt quan tài 7s, không đánh/nhận đòn.',cooldown:'confineCooldown',delay:'confineDelay',support:true},
    {id:'silverBolt',name:'Silver Bolt',animation:'attack',summary:'Nội tại: đạn thường +20% công; thêm 40% công nếu địch có debuff.',passive:true}
  ]
};
// Expanded roster kits are invented role prototypes, not claims about official hero skills.
// Shared tune keys keep these kits modest; existing role kits above remain unchanged.
Object.assign(KITS,{
  'prototype-blade':[
    {id:'protoCleave',name:'Thử nghiệm · Chém quét',animation:'skillArc',summary:'Kỹ năng prototype: chém vùng trước mặt ở cự ly gần.',cooldown:'protoStrikeCooldown',delay:'protoStrikeDelay',range:'meleeRange'},
    {id:'protoHamstring',name:'Thử nghiệm · Chém suy lực',animation:'skill',summary:'Kỹ năng prototype: chém một địch và tạm giảm công của nó.',cooldown:'protoBurstCooldown',delay:'protoBurstDelay',range:'meleeRange'},
    {id:'protoBladeTempo',name:'Thử nghiệm · Nhịp kiếm',animation:'skillAura',summary:'Kỹ năng prototype: chỉ bản thân tạm tăng nhịp đánh.',cooldown:'protoAidCooldown',delay:'protoAidDelay',support:true},
    {id:'protoEdge',name:'Thử nghiệm · Lưỡi sắc',animation:'attack',summary:'Nội tại prototype: tăng công bản thân.',passive:true}
  ],
  'prototype-guardian':[
    {id:'protoSlam',name:'Thử nghiệm · Chấn đất',animation:'skillArc',summary:'Kỹ năng prototype: đập vùng quanh bản thân, đánh ngã địch gần.',cooldown:'protoStrikeCooldown',delay:'protoStrikeDelay',range:'meleeRange'},
    {id:'protoGuardShell',name:'Thử nghiệm · Khiên riêng',animation:'skillShield',summary:'Kỹ năng prototype: tạo khiên có thời hạn chỉ cho bản thân.',cooldown:'protoBurstCooldown',delay:'protoBurstDelay',support:true},
    {id:'protoPartyGuard',name:'Thử nghiệm · Trận phòng hộ',animation:'skillAura',summary:'Kỹ năng prototype: toàn đội tạm giảm sát thương nhận.',cooldown:'protoAidCooldown',delay:'protoAidDelay',support:true},
    {id:'protoFortitude',name:'Thử nghiệm · Bền bỉ',animation:'skillShield',summary:'Nội tại prototype: bản thân luôn giảm sát thương nhận.',passive:true}
  ],
  'prototype-support':[
    {id:'protoBolt',name:'Thử nghiệm · Tia trợ chiến',animation:'skill',summary:'Kỹ năng prototype: phóng một đạn vào địch; trúng mới gây sát thương.',cooldown:'protoStrikeCooldown',delay:'protoStrikeDelay',range:'protoStrikeRange'},
    {id:'protoMend',name:'Thử nghiệm · Vá thương',animation:'skillShield',summary:'Kỹ năng prototype: hồi máu cho đồng minh có tỷ lệ máu thấp nhất.',cooldown:'protoBurstCooldown',delay:'protoBurstDelay',support:true},
    {id:'protoRally',name:'Thử nghiệm · Hợp lực',animation:'skillAura',summary:'Kỹ năng prototype: toàn đội tạm tăng công.',cooldown:'protoAidCooldown',delay:'protoAidDelay',support:true},
    {id:'protoCare',name:'Thử nghiệm · Chăm sóc',animation:'skillAura',summary:'Nội tại prototype: tăng lượng hồi của Vá thương.',passive:true}
  ],
  'prototype-ranged':[
    {id:'protoVolley',name:'Thử nghiệm · Loạt bắn',animation:'skillArc',summary:'Kỹ năng prototype: nhiều phát liên tiếp vào một địch; có thể bị ngắt.',cooldown:'protoStrikeCooldown',delay:'protoStrikeDelay',range:'protoStrikeRange'},
    {id:'protoSnareShot',name:'Thử nghiệm · Đạn níu chân',animation:'skill',summary:'Kỹ năng prototype: bắn một địch và tạm giảm nhịp đánh của nó.',cooldown:'protoBurstCooldown',delay:'protoBurstDelay',range:'protoStrikeRange'},
    {id:'protoRangedTempo',name:'Thử nghiệm · Nhịp ngắm',animation:'skillAura',summary:'Kỹ năng prototype: chỉ bản thân tạm tăng nhịp đánh.',cooldown:'protoAidCooldown',delay:'protoAidDelay',support:true},
    {id:'protoCadence',name:'Thử nghiệm · Tay vững',animation:'attack',summary:'Nội tại prototype: tăng nhịp đánh bản thân.',passive:true}
  ],
  'prototype-mage':[
    {id:'protoNova',name:'Thử nghiệm · Vòng bùng sáng',animation:'skillArc',summary:'Kỹ năng prototype: nổ vùng quanh địch được chọn.',cooldown:'protoStrikeCooldown',delay:'protoStrikeDelay',range:'protoStrikeRange'},
    {id:'protoDimming',name:'Thử nghiệm · Màn suy lực',animation:'skillShield',summary:'Kỹ năng prototype: gây sát thương vùng và tạm giảm công địch.',cooldown:'protoBurstCooldown',delay:'protoBurstDelay',range:'protoStrikeRange'},
    {id:'protoInsight',name:'Thử nghiệm · Nhãn sáng',animation:'skillAura',summary:'Kỹ năng prototype: toàn đội tạm tăng xác suất chí mạng.',cooldown:'protoAidCooldown',delay:'protoAidDelay',support:true},
    {id:'protoSpark',name:'Thử nghiệm · Tia may mắn',animation:'attack',summary:'Nội tại prototype: tăng xác suất chí mạng bản thân.',passive:true}
  ]
});
/** Build an isolated, dependency-injected skill system; it never owns the game clock. */
function createHeroSkillSystem({tune,rng,battle,impact,animate,emit,visual=null}){
  const kitKey=u=>typeof u==='string'?u:(u.kitKind??u.kind);
  const kit=u=>KITS[kitKey(u)]||[];
  const original=(u,role)=>kitKey(u)===role;
  const passiveBonus=(u,key)=>{
    if(kitKey(u)==='eluard'&&key==='vulnerable')return u.divineShield>0?0:tune.miracleVulnerability-1;
    if(key==='damageImmune'&&battle()&&alive(own(u,battle())).some(s=>kitKey(s)==='eluard'&&s.prayerTargetSlot===u.slot&&s.prayerToken===s.castToken&&s.channelLeft>0))return 1;
    if(kitKey(u)==='oscar'&&u.unfazedActive&&key==='crit')return tune.unfazedCrit;
    if(kitKey(u)==='oscar'&&u.unfazedActive&&key==='reduction')return tune.unfazedReduction;
    if(kitKey(u)==='oscar'&&key==='haste'&&battle())return (battle().oscarAuras||[]).some(e=>e.source===u&&e.left>0&&distance(u,e)<=tune.auraHasteRadius)?tune.auraHasteBonus:0;
    if(kitKey(u)==='rigby'&&key==='reduction')return (u.frenzyStacks||0)*tune.frenzyReduction;
    if(kitKey(u)==='rigby'&&key==='haste')return (u.frenzyStacks||0)*tune.frenzyHaste+(u.frenzyLeft>0?tune.frenzyBurstHaste:0);
    if(key==='weaken'&&battle())return Math.max(0,...(battle().devilTraps||[]).filter(e=>e.left>0&&e.source.side!==u.side&&u.hp>0&&!(u.banishLeft>0)&&!(u.entryLeft>0)&&distance(u,e)<=tune.devilTrapRadius).map(()=>tune.devilTrapWeaken));
    if(kitKey(u)==='rosaline'&&key==='reduction')return followTarget(u)?tune.followReduction:0;
    if(kitKey(u)==='rosaline'&&key==='damageImmune')return u.action?.skillId==='springCleaning'||(u.cleaningToken===u.castToken&&u.channelLeft>0)?1:0;
    if(kitKey(u)==='gwyneth'&&['crit','strengthReady'].includes(key))return alive(foes(u,battle())).some(t=>distance(u,t)<=tune.strengthRadius)?0:key==='crit'?tune.strengthCrit:1;
    if(kitKey(u)==='hendrik'&&key==='reduction'&&u.standfastLeft>0)return tune.standfastReduction;
    if(kitKey(u)==='thane'&&key==='damageImmune')return u.action?.skillId==='eviscerate'||(u.eviscerateToken===u.castToken&&u.channelLeft>0)?1:0;
    if(kitKey(u)==='thane'&&key==='crit')return tune.focusCrit;
    const passive={ 'prototype-blade':'attack','prototype-guardian':'reduction','prototype-ranged':'haste','prototype-mage':'crit' };
    return passive[kitKey(u)]===key?tune.protoPassive:0;
  };
  const alive=list=>list.filter(u=>u.hp>0&&!(u.banishLeft>0)&&!(u.entryLeft>0));
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const own=(u,b)=>u.side===0?b.heroes:b.enemies;
  const foes=(u,b)=>u.side===0?b.enemies:b.heroes;
  const inEnemyHalf=(u,t)=>u.side===0?t.x>=tune.gwynethHalfX:t.x<=tune.gwynethHalfX;
  /** Pure recipient lookup: draw/bonus calls never modify assignments or consume RNG. */
  function followTarget(u){
    if(kitKey(u)!=='rosaline'||!battle())return null;
    const candidates=alive(own(u,battle())).filter(t=>t!==u);
    return candidates.find(t=>t.slot===u.followSlot)||candidates.sort((a,b)=>(b.maxHP+b.attack*tune.powerAttackWeight)-(a.maxHP+a.attack*tune.powerAttackWeight)||a.slot-b.slot)[0]||null;
  }
  /** Pure, per-caster symbol lookup; saves and other Cecilia instances never share marks. */
  function sinCount(u,target){return (u.sinMarks||[]).find(e=>e.side===target.side&&e.slot===target.slot)?.count||0;}
  function markSin(u,target,count){
    if(target.hp<=0||target.banishLeft>0||target.entryLeft>0)return;
    u.sinMarks??=[];let record=u.sinMarks.find(e=>e.side===target.side&&e.slot===target.slot);
    if(!record){record={side:target.side,slot:target.slot,count:0};u.sinMarks.push(record);}
    record.count=Math.min(tune.sinCap,record.count+count);visual?.buff(u,target,'symbolsSin');
  }
  /** Once-only delayed arrival; entering units count as alive but are not combat targets. */
  function arrive(u,b,dt){
    if(!(u.entryLeft>0)||u.hp<=0||u.banishLeft>0)return;
    u.entryLeft=Math.max(0,u.entryLeft-dt);if(u.entryLeft>0)return;
    const candidates=alive(foes(u,b)),target=candidates.find(t=>t.slot===u.slot)||candidates.sort((a,c)=>distance(u,a)-distance(u,c)||a.slot-c.slot)[0];
    u.castCounts.atonement=(u.castCounts.atonement||0)+1;
    if(!target)return;
    u.x=Math.max(tune.arenaLeft,Math.min(tune.arenaRight,target.x+(u.side===0?1:-1)*tune.atonementOffset));u.y=Math.max(tune.arenaTop,Math.min(tune.arenaBottom,target.y));u.target=target;u.facing=target.x>=u.x?1:-1;
    u.action=null;u.castToken++;markSin(u,target,tune.atonementMarks);
    schedule(u,[target],u.attack*tune.atonementDamage,'atonement',tune.atonementHits,tune.atonementInterval);
    u.channelLeft+=dt; // Arrival happens before this frame's channel countdown.
    for(const h of b.skillHits)if(h.source===u&&h.skill==='atonement'&&h.token===u.castToken)h.left+=dt;
    animate(u,'skillShield');visual?.release(u,{skillId:'atonement',target});emit({type:'skill-reactive',actor:u.name,skill:'atonement',target:target.name});
  }
  /** Pure ground-knife selection: prefer the nearest own knife with a valid enemy in its area. */
  function sliceKnife(u){
    const b=battle();if(!b)return null;
    return (b.oscarKnives||[]).filter(e=>e.source===u&&e.left>0&&alive(foes(u,b)).some(t=>distance(t,e)<=tune.sliceDiceRadius)).sort((a,c)=>distance(u,a)-distance(u,c))[0]||null;
  }
  /** Retain a bounded, timed ground record; no knife is added by the draw path. */
  function groundKnife(source,x,y){
    const b=battle();b.oscarKnives??=[];
    b.oscarKnives.push({source,x:Math.max(tune.arenaLeft,Math.min(tune.arenaRight,x)),y:Math.max(tune.arenaTop,Math.min(tune.arenaBottom,y)),left:tune.oscarKnifeLife});
    const ownKnives=b.oscarKnives.filter(e=>e.source===source);for(const old of ownKnives.slice(0,Math.max(0,ownKnives.length-tune.oscarKnifeLimit)))b.oscarKnives.splice(b.oscarKnives.indexOf(old),1);
  }
  const activeBuffs=u=>Object.values(u.buffs||{}).filter(b=>b.left>0);
  // Distinct buffs add; refreshing one ID still replaces its own record.
  const bonus=(u,key)=>passiveBonus(u,key)+activeBuffs(u).reduce((sum,b)=>sum+(b[key]||0),0);
  /** Initialize per-battle timers only: save records remain unchanged. */
  function initialize(u){
    u.buffs={};u.controlLeft=0;u.channelLeft=0;u.castToken=0;u.skillTimers={};u.castCounts={};u.critCount=0;u.banishLeft=0;
    u.slainSides={};u.fateProficiency=tune.fateProficiency;u.fateDissolve=tune.fateDissolve;
    if(kitKey(u)==='eluard-awakened'){u.causalDrift=0;u.divergence=0;u.realmActive=false;u.realmClock=0;u.causalPulses=0;u.fateClock=0;u.fateChecks={};u.fateTotal=0;u.negateUsed=0;u.astralProjections=foes(u,battle()).map(t=>({side:t.side,slot:t.slot,attack:0,defense:0,hp:0,initialAttack:t.attack,initialHP:t.maxHP}));}
    if(kitKey(u)==='walker'){u.oldFaithful=0;u.saloonLeft=0;u.reloadLeft=0;u.shotgunAmmo=tune.shotgunMagazine;}
    if(kitKey(u)==='peggy'){u.guardAttacks=0;u.royalGuards=[makeGuard(u,0),makeGuard(u,1)];}
    if(kitKey(u)==='eluard'){u.divineShield=Math.round(u.maxHP*tune.miracleShield);u.divineRecoveryLeft=0;u.divineRecovering=false;u.prayerTargetSlot=null;u.prayerToken=null;u.castCounts.divineMiracle=1;}
    if(kitKey(u)==='oscar')u.unfazedActive=false;
    if(kitKey(u)==='rigby'){u.frenzyStacks=0;u.frenzyLeft=0;u.restedLeft=0;u.restedClock=0;}
    u.entryLeft=kitKey(u)==='cecilia'?tune.atonementDelay:0;if(kitKey(u)==='cecilia'){u.sinMarks=[];u.castCounts.atonement=0;}
    if(kitKey(u)==='rosaline'){u.followSlot=null;u.cleaningToken=null;u.followSlot=followTarget(u)?.slot??null;}
    if(kitKey(u)==='gwyneth')for(const id of ['flamingArrows','lightningArrows','strengthInNumbers'])u.castCounts[id]=0;
    if(kitKey(u)==='thane'){u.executionCharges=0;u.executionAuthorized=false;u.eviscerateToken=null;}
    if(kitKey(u)==='rowan'){u.supplyLeft=tune.supplyCount;u.supplyTimers={};u.damageControlLeft=0;}
    if(kitKey(u)==='hendrik'){u.sacrificeUsed=false;u.guardLeft=0;u.protectedSlot=null;u.standfastUsed=false;u.standfastLeft=0;u.standfastClock=0;}
    for(const s of kit(u))if(!s.passive&&!s.reactive)u.skillTimers[s.id]=tune[s.delay]+u.slot*tune.spawnStagger;
    if(kit(u).length)u.skillCD=Math.min(...Object.values(u.skillTimers));
  }
  /** Most overdue ready skill wins; independent cooldowns cannot starve later skills. */
  function ready(u,target=null){
    if(u.entryLeft>0||(kitKey(u)==='walker'&&u.saloonLeft>0))return null;
    const ordered=kit(u).filter(s=>!s.passive&&!s.reactive&&(s.id!=='sliceDice'||sliceKnife(u))&&(s.id!=='fineCuts'||alive(foes(u,battle())).some(t=>distance(u,t)<=tune.fineCutsRange))&&(s.id!=='drunkenFrenzy'||!(u.frenzyLeft>0))&&(!(kitKey(u)==='rosaline'&&s.support)||followTarget(u))&&(s.id!=='divineArrow'||alive(foes(u,battle())).some(t=>inEnemyHalf(u,t)))&&(!s.requiresCrits||u.executionCharges>=tune.executionCrits)&&(u.skillTimers?.[s.id]??Infinity)<=0).sort((a,b)=>u.skillTimers[a.id]-u.skillTimers[b.id]);
    return (target?ordered.find(s=>s.support||distance(u,target)<=tune[s.range]):null)||ordered[0]||null;
  }
  function nextCooldown(u){const timers=Object.entries(u.skillTimers||{}).filter(([id])=>id!=='execution'||u.executionCharges>=tune.executionCrits).map(([,left])=>left);return Math.max(0,Math.min(...timers));}
  function cast(u,s){
    if(s.requiresCrits&&u.executionCharges<tune.executionCrits)return false;
    u.skillTimers[s.id]=tune[s.cooldown];u.castCounts[s.id]=(u.castCounts[s.id]||0)+1;u.castToken++;
    if(s.requiresCrits){u.executionCharges-=tune.executionCrits;u.executionToken=u.castToken;u.executionAuthorized=true;}
    u.skillCD=nextCooldown(u);visual?.cast(u,s);return true;
  }
  function buff(source,target,id,values,duration){
    if(target.hp<=0||target.banishLeft>0||target.entryLeft>0)return;target.buffs??={};target.buffs[id]={...values,left:duration};
    battle().effects.push({source,target,x:target.x,y:target.y,buff:id,t:0,life:tune.buffEffectDuration});
    visual?.buff(source,target,id);
    emit({type:'skill-buff',actor:source.name,target:target.name,skill:id,duration});
  }
  /** Knockdown interrupts unreleased actions/channels, except an active Royal Charge. */
  function stun(target,duration){
    if(target.hp<=0||target.banishLeft>0||target.entryLeft>0||bonus(target,'controlImmune')>0||target.action?.skillId==='royalCharge')return;
    if(target.standfastLeft>0)endStandfast(target);
    if(kitKey(target)==='oscar')target.unfazedActive=false;
    target.controlLeft=Math.max(target.controlLeft||0,duration);target.action=null;target.moving=false;target.channelLeft=0;target.castToken=(target.castToken||0)+1;
  }
  /** Owner-bound guards have health and independent clocks, never occupy hero arrays. */
  function makeGuard(u,id){return{id,x:u.x+(u.side===0?1:-1)*tune.guardOffset,y:u.y+(id===0?-1:1)*tune.guardOffset,hp:Math.round(u.maxHP*tune.guardStats),maxHP:Math.round(u.maxHP*tune.guardStats),attack:u.attack*tune.guardStats,shield:0,shieldLeft:0,attackCD:0,dutyLeft:0};}
  function tickGuards(u,b,dt){
    if(u.hp<=0){for(const g of u.royalGuards)g.hp=0;return;}if(u.banishLeft>0||u.entryLeft>0)return;
    for(const g of u.royalGuards){
      if(g.hp<=0)continue;g.dutyLeft=Math.max(0,g.dutyLeft-dt);if(g.shieldLeft>0){g.shieldLeft=Math.max(0,g.shieldLeft-dt);if(g.shieldLeft===0)g.shield=0;}
      g.attackCD=Math.max(0,g.attackCD-dt);const enemies=alive(foes(u,b)),near=enemies.filter(t=>distance(u,t)<=tune.guardProtectRadius);const target=(near.length?near:enemies).sort((a,c)=>distance(g,a)-distance(g,c)||a.slot-c.slot)[0];
      const home={x:u.x+(u.side===0?1:-1)*tune.guardOffset,y:u.y+(g.id===0?-1:1)*tune.guardOffset},goal=target||home,dx=goal.x-g.x,dy=goal.y-g.y,d=Math.hypot(dx,dy),stop=target?tune.guardRange:0,move=Math.min(tune.guardMoveSpeed*dt,Math.max(0,d-stop));
      if(d>0){g.x+=dx/d*move;g.y+=dy/d*move;}g.x=Math.max(tune.arenaLeft,Math.min(tune.arenaRight,g.x));g.y=Math.max(tune.arenaTop,Math.min(tune.arenaBottom,g.y));
      if(target&&distance(g,target)<=tune.guardRange&&g.attackCD<=0){hit(u,target,g.attack,'dutyBound');u.guardAttacks++;g.attackCD=tune.guardAttackInterval/(1+(g.dutyLeft>0?tune.dutyHaste:0));}
    }
  }
  /** Only actual health-bound damage nearby can be intercepted; shields are not spent twice. */
  function interceptGuard(u,value){
    if(kitKey(u)!=='peggy'||u.hp<=0||u.banishLeft>0||u.entryLeft>0||value<=0)return value;
    const g=u.royalGuards.find(g=>g.hp>0&&distance(u,g)<=tune.guardProtectRadius);if(!g)return value;
    const protection=Math.min(value*tune.guardIntercept,(g.hp+g.shield)/((1-tune.guardArmor)*(1-(g.dutyLeft>0?tune.dutyReduction:0))));
    let damage=protection*(1-tune.guardArmor)*(1-(g.dutyLeft>0?tune.dutyReduction:0));const absorbed=Math.min(g.shield,damage);g.shield-=absorbed;damage-=absorbed;g.hp=Math.max(0,g.hp-damage);return Math.max(0,value-protection);
  }
  /** Accumulate passive pulses as simulation work, never recursively inside a damage roll. */
  function gainCausal(u,count){
    u.causalDrift+=count;while(u.causalDrift>=tune.causalThreshold){u.causalDrift-=tune.causalThreshold;u.causalPulses++;u.divergence=Math.min(tune.divergenceMax,u.divergence+1);if(u.divergence>=tune.divergenceMax)u.realmActive=true;}
  }
  function correctFate(source,target){
    const b=battle();if(!b)return false;
    const u=alive(own(source,b)).filter(u=>kitKey(u)==='eluard-awakened').sort((a,c)=>a.slot-c.slot).find(u=>(u.fateChecks[source.slot]||0)<tune.fateAllyLimit&&u.fateTotal<tune.fateTotalLimit&&(u.fateProficiency??tune.fateProficiency)>=(target.fateDissolve??tune.fateDissolve)*(1+tune.fateSurplus));
    if(!u)return false;u.fateChecks[source.slot]=(u.fateChecks[source.slot]||0)+1;u.fateTotal++;u.castCounts.fatesCorrection=(u.castCounts.fatesCorrection||0)+1;gainCausal(u,tune.fateDrift);visual?.buff(u,source,'fatesCorrection');return true;
  }
  /** React to an actual lethal health hit after shields; consumes a shared finite rescue budget. */
  function negateFatal(target,value){
    if(value<target.hp||target.hp<=0||target.banishLeft>0||target.entryLeft>0)return false;
    const u=alive(own(target,battle())).filter(u=>kitKey(u)==='eluard-awakened'&&u.negateUsed<tune.negateLimit).sort((a,c)=>a.slot-c.slot)[0];if(!u)return false;
    u.negateUsed++;u.castCounts.negateReality=(u.castCounts.negateReality||0)+1;target.banishLeft=tune.negateDuration;target.action=null;target.channelLeft=0;target.castToken++;target.moving=false;target.target=null;target.fateProficiency=(target.fateProficiency??tune.fateProficiency)*(1+tune.negateProficiency);visual?.buff(u,target,'negateReality');emit({type:'skill-reactive',actor:u.name,target:target.name,skill:'negateReality'});return true;
  }
  /** Permanent bounded attribute transfer; projection records are untargetable, not extra fighters. */
  function stripAstral(u,target){
    const p=u.astralProjections.find(p=>p.side===target.side&&p.slot===target.slot);if(!p)return;
    target.astralLoss??={attack:0,defense:0,hp:0,initialAttack:p.initialAttack,initialHP:p.initialHP};const loss=target.astralLoss;
    const fraction=key=>Math.min(tune.corrosiveStrip,Math.max(0,tune.corrosiveCap-loss[key]));
    const attack=fraction('attack');loss.attack+=attack;target.attack=Math.max(0,target.attack-loss.initialAttack*attack);p.attack+=loss.initialAttack*attack;
    const defense=fraction('defense');loss.defense+=defense;p.defense+=defense;
    if(target.kind!=='boss'){const hp=fraction('hp');loss.hp+=hp;const value=loss.initialHP*hp;target.maxHP=Math.max(1,target.maxHP-value);target.hp=Math.min(target.hp,target.maxHP);p.hp+=value;}
  }
  /** Apply live attack/debuff modifiers and seeded critical rolls at actual impact. */
  function damage(source,target,amount,normal=false,options={}){
    options??={};
    if(target?.banishLeft>0||target?.entryLeft>0||bonus(target,'damageImmune')>0)return{amount:0,critical:false};
    let multiplier=1;
    if(original(source,'ranger'))multiplier+=tune.exploitMax*Math.max(0,1-target.hp/(target.maxHP||target.hp||1));
    if(original(source,'healer')&&normal){multiplier+=tune.silverBoltBonus;if(Object.values(target.buffs||{}).some(b=>b.left>0&&(b.slow||b.weaken||b.vulnerable||b.fromSide===source.side))||target.controlLeft>0)multiplier+=tune.silverBoltDebuff;}
    multiplier*=1+bonus(source,'attack');multiplier*=Math.max(0,1-bonus(source,'weaken'));
    const offensive=amount*multiplier;
    multiplier*=1+bonus(target,'vulnerable');multiplier*=Math.max(0,1-bonus(target,'reduction'));
    if(target.buffs?.lockOn?.left>0&&target.buffs.lockOn.fromSide===source.side){source.buffs??={};source.buffs.lockOnReward={haste:tune.lockOnHaste,crit:tune.lockOnCrit,left:tune.lockOnBuffDuration};}
    const critMultiplier=tune.criticalMultiplier+(kitKey(source)==='walker'?(source.oldFaithful||0):0);
    const chance=(original(source,'mage')?tune.brillianceCrit:0)+bonus(source,'crit')+(options.crit||0);
    const critical=!options.noCrit&&chance>0&&(rng()<Math.min(tune.critChanceCap,chance)||correctFate(source,target));if(critical){visual?.critical(source,target);source.critCount=(source.critCount||0)+1;if(kitKey(source)==='walker'){source.oldFaithful=Math.min(tune.oldFaithfulCap,(source.oldFaithful||0)+tune.oldFaithfulStep);source.castCounts.oldFaithful=(source.castCounts.oldFaithful||0)+1;visual?.buff(source,source,'oldFaithful');}if(kitKey(source)==='thane')source.executionCharges=(source.executionCharges||0)+1;if(kitKey(source)==='gwyneth'&&passiveBonus(source,'crit')>0){source.castCounts.strengthInNumbers=(source.castCounts.strengthInNumbers||0)+1;visual?.buff(source,source,'strengthInNumbers');}emit({type:'critical',actor:source.name,target:target.name,passive:original(source,'mage')?'brilliance':kitKey(source)==='prototype-mage'?'protoSpark':kitKey(source)==='thane'?'focus':null});if(original(source,'mage')&&!source.action&&!(source.channelLeft>0)&&source.animation!=='death')animate(source,'skillAura');}
    const unmitigated=offensive*(critical?critMultiplier:1);
    return{amount:amount*multiplier*(critical?critMultiplier:1),critical,unmitigated};
  }
  /** Separate Divine Shield layer; shield-only breaks still interrupt and arm recovery. */
  function absorbDivine(u,value){
    if(kitKey(u)!=='eluard'||!(u.divineShield>0)||value<=0)return{amount:value,absorbed:0};
    const absorbed=Math.min(u.divineShield,value);u.divineShield-=absorbed;
    if(u.divineShield===0){u.divineRecovering=true;u.divineRecoveryLeft=tune.miracleStun;u.controlLeft=Math.max(u.controlLeft||0,tune.miracleStun);u.action=null;u.channelLeft=0;u.castToken++;u.moving=false;visual?.buff(u,u,'divineMiracle');}
    return{amount:value-absorbed,absorbed};
  }
  /** End a one-use stance without rearming it or affecting another hero's channel. */
  function endStandfast(u){u.standfastLeft=0;u.standfastClock=0;u.channelLeft=0;}
  /** React after actual HP loss, never resurrecting or triggering from shield-only damage. */
  function afterDamage(u){
    if(kitKey(u)!=='hendrik'||u.hp<=0||u.banishLeft>0||u.standfastUsed||u.hp/u.maxHP>=tune.standfastThreshold)return;
    u.standfastUsed=true;u.standfastLeft=tune.standfastDuration;u.standfastClock=0;
    u.action=null;u.castToken++;u.channelLeft=tune.standfastDuration;u.moving=false;
    u.castCounts.standfast=(u.castCounts.standfast||0)+1;animate(u,'skillAura');visual?.buff(u,u,'standfast');
    emit({type:'skill-reactive',actor:u.name,skill:'standfast'});
  }
  /** Pick at most one protector; caller applies the same offensive roll to the guardian once. */
  function guardDamage(target,finalDamage){
    if(target.hp<=0||target.banishLeft>0||target.entryLeft>0||target.slot<2)return null;
    const guardians=alive(own(target,battle())).filter(u=>u!==target&&kitKey(u)==='hendrik');
    const ongoing=guardians.find(u=>u.guardLeft>0&&u.protectedSlot===target.slot);
    if(ongoing)return ongoing;
    if(Math.max(0,finalDamage-(target.shield||0)-(target.divineShield||0))<target.hp)return null;
    const u=guardians.find(u=>!u.sacrificeUsed);if(!u)return null;
    u.sacrificeUsed=true;u.protectedSlot=target.slot;u.guardLeft=tune.sacrificialDuration;
    u.castCounts.sacrificialShield=(u.castCounts.sacrificialShield||0)+1;
    u.x=Math.max(tune.arenaLeft,Math.min(tune.arenaRight,target.x+(u.side===0?1:-1)*tune.sacrificialOffset));
    u.y=Math.max(tune.arenaTop,Math.min(tune.arenaBottom,target.y));
    u.action=null;u.castToken++;u.moving=false;if(!(u.standfastLeft>0))u.channelLeft=0;
    animate(u,'skillShield');visual?.buff(u,target,'sacrificialShield');
    emit({type:'skill-reactive',actor:u.name,target:target.name,skill:'sacrificialShield'});return u;
  }
  /** Explicit energy-free adaptation: mitigate one large health hit, never consume on a shield-only hit. */
  function incomingDamage(u,value){
    if(kitKey(u)!=='rowan'||u.damageControlLeft>0||Math.max(0,value-(u.shield||0))<=u.maxHP*tune.damageControlThreshold)return value;
    u.damageControlLeft=tune.damageControlCooldown;u.castCounts.damageControl=(u.castCounts.damageControl||0)+1;
    visual?.buff(u,u,'damageControl');emit({type:'skill-reactive',actor:u.name,skill:'damageControl'});
    return Math.round(value*(1-tune.damageControlReduction));
  }
  /** Supply bottles are shared and finite; cooldown belongs to the recipient, not the renderer. */
  function supplies(u,b,dt){
    u.damageControlLeft=Math.max(0,u.damageControlLeft-dt);
    for(const slot of Object.keys(u.supplyTimers))u.supplyTimers[slot]=Math.max(0,u.supplyTimers[slot]-dt);
    if(u.hp<=0||u.banishLeft>0||u.supplyLeft<=0)return;
    const eligible=alive(own(u,b)).filter(t=>t.hp/t.maxHP<tune.supplyThreshold&&distance(u,t)<=tune.supplyRadius&&!(u.supplyTimers[t.slot]>0)).sort((a,b)=>a.hp/a.maxHP-b.hp/b.maxHP||a.slot-b.slot);
    for(const target of eligible){
      if(u.supplyLeft<=0)break;u.supplyLeft--;u.supplyTimers[target.slot]=tune.supplyCooldown;
      u.castCounts.healthySupplies=(u.castCounts.healthySupplies||0)+1;
      impact(u,target,target.maxHP*tune.supplyHeal,true);visual?.buff(u,target,'healthySupplies');
      emit({type:'skill-reactive',actor:u.name,target:target.name,skill:'healthySupplies'});
    }
  }
  const within=(list,center,radius)=>alive(list).filter(t=>distance(t,center)<=radius);
  function hit(source,target,amount,skill,control=0,options=null){if(target.hp<=0||target.banishLeft>0||target.entryLeft>0)return;impact(source,target,amount,false,false,null,options);visual?.hit(source,target,skill);if(control)stun(target,control);emit({type:'skill-hit',actor:source.name,target:target.name,skill});}
  function schedule(source,targets,amount,skill,count,interval,finisher=null){
    const b=battle();b.skillHits??=[];
    for(let n=0;n<count;n++)b.skillHits.push({source,targets:[...targets],amount,skill,left:n*interval,token:source.castToken,control:0});
    if(finisher)b.skillHits.push({source,targets:[...targets],amount:finisher.amount,skill,left:count*interval,token:source.castToken,control:tune.knockdownSeconds});
    source.channelLeft=Math.max(0,(count-1+(finisher?1:0))*interval);
  }
  /** Invented role actions reuse the same hits, channels, buffs, projectiles and clock. */
  function resolvePrototype(u,a,b,enemies,allies,target,power){
    const duration=tune.protoAidDuration,potency=tune.protoAidPower;
    const area=()=>target?within(enemies,target,tune.protoBurstRadius):[];
    switch(a.skillId){
      case 'protoCleave':
        for(const t of within(enemies,u,Math.max(tune.meleeRange,tune.protoBurstRadius)).filter(t=>(t.x-u.x)*u.facing>=0))hit(u,t,power*tune.protoStrikeDamage,a.skillId);
        break;
      case 'protoHamstring':
        if(target){hit(u,target,power*tune.protoBurstDamage,a.skillId);buff(u,target,a.skillId,{weaken:potency},duration);}
        break;
      case 'protoBladeTempo':case 'protoRangedTempo':buff(u,u,a.skillId,{haste:potency},duration);break;
      case 'protoSlam':
        for(const t of within(enemies,u,Math.max(tune.meleeRange,tune.protoBurstRadius)))hit(u,t,power*tune.protoStrikeDamage,a.skillId,tune.knockdownSeconds);
        break;
      case 'protoGuardShell':
        u.shield=Math.max(u.shield||0,Math.round(power*tune.protoBurstDamage));u.shieldLeft=duration;visual?.buff(u,u,a.skillId);
        break;
      case 'protoPartyGuard':for(const t of allies)buff(u,t,a.skillId,{reduction:potency},duration);break;
      case 'protoBolt':
        if(target)b.projectiles.push({source:u,target,x:u.x,y:u.y-65,amount:power*tune.protoStrikeDamage,heal:false,spell:true,skillId:a.skillId,t:0});
        break;
      case 'protoMend':{
        const chosen=[...allies].sort((p,q)=>p.hp/p.maxHP-q.hp/q.maxHP)[0];
        if(chosen){impact(u,chosen,power*tune.protoBurstDamage*(1+tune.protoPassive),true);visual?.buff(u,chosen,a.skillId);}
        break;
      }
      case 'protoRally':for(const t of allies)buff(u,t,a.skillId,{attack:potency},duration);break;
      case 'protoVolley':
        if(target)schedule(u,[target],power*tune.protoStrikeDamage/tune.barrageHits,a.skillId,tune.barrageHits,tune.multiHitInterval);
        break;
      case 'protoSnareShot':
        if(target){hit(u,target,power*tune.protoBurstDamage,a.skillId);buff(u,target,a.skillId,{slow:potency},duration);}
        break;
      case 'protoNova':for(const t of area())hit(u,t,power*tune.protoStrikeDamage,a.skillId);break;
      case 'protoDimming':
        for(const t of area()){hit(u,t,power*tune.protoBurstDamage,a.skillId);buff(u,t,a.skillId,{weaken:potency},duration);}
        break;
      case 'protoInsight':for(const t of allies)buff(u,t,a.skillId,{crit:potency},duration);break;
    }
  }
  /** Resolve distinct mechanics; returns false for non-kit/normal actions. */
  function resolve(u,a){
    if(!a.skillId)return false;
    const prototype=kitKey(u)?.startsWith('prototype-');
    if((prototype||['thane','hendrik','rowan','gwyneth','rosaline','cecilia','rigby','oscar','eluard','eluard-awakened','peggy','walker'].includes(kitKey(u)))&&!kit(u).some(s=>s.id===a.skillId&&!s.passive&&!s.reactive))return false;
    if(a.skillId==='execution'&&(!u.executionAuthorized||u.executionToken!==u.castToken))return false;
    const b=battle(),enemies=alive(foes(u,b)),allies=alive(own(u,b));
    const target=a.target?.hp>0&&!(a.target.banishLeft>0)&&!(a.target.entryLeft>0)?a.target:enemies.sort((p,q)=>distance(u,p)-distance(u,q))[0];
    const power=u.attack*(a.evolved?tune.evolveMultiplier:1);
    if(prototype)resolvePrototype(u,a,b,enemies,allies,target,power);
    else if(a.skillId==='saloonBlast'){
      u.reloadLeft=0;u.shotgunAmmo=tune.shotgunMagazine;u.saloonLeft=tune.saloonDuration;visual?.buff(u,u,a.skillId);
    }else if(a.skillId==='spittoonSmack'){
      if(target&&distance(u,target)<=tune.spittoonRange){const token=target.castToken;hit(u,target,power*tune.spittoonDamage,a.skillId);stun(target,tune.spittoonStun);if(target.hp>0&&target.castToken!==token&&target.controlLeft>0){b.skillHits.push({source:u,targets:[target],walkerFollow:true,amount:power*tune.spittoonFollowDamage,skill:a.skillId,left:tune.spittoonFollowDelay,token:u.castToken});u.channelLeft=tune.spittoonFollowDelay;}}
    }else if(a.skillId==='gunslinger'){
      for(const t of [...enemies].sort((a,c)=>a.hp/a.maxHP-c.hp/c.maxHP||a.slot-c.slot).slice(0,tune.gunslingerTargets))b.projectiles.push({source:u,target:t,x:u.x,y:u.y-65,amount:power*tune.gunslingerDamage,skillId:a.skillId,spell:false,heal:false,t:0});
    }else if(a.skillId==='dutyBound'){
      let guards=u.royalGuards.filter(g=>g.hp>0);
      if(!guards.length){const g=makeGuard(u,0);u.royalGuards=[g];guards=[g];for(const t of within(enemies,u,tune.guardProtectRadius)){hit(u,t,g.attack*tune.guardArrivalDamage,a.skillId);if(bonus(t,'controlImmune')<=0){t.x=Math.max(tune.arenaLeft,Math.min(tune.arenaRight,t.x+(u.side===0?1:-1)*tune.guardPush));stun(t,tune.guardArrivalStun);}}}
      for(const g of guards)g.dutyLeft=tune.dutyDuration;
    }else if(a.skillId==='royalScroll'){
      for(const g of u.royalGuards)if(g.hp>0)g.hp=Math.min(g.maxHP,g.hp+power*tune.scrollHeal);
      const t=[...allies].sort((a,c)=>a.hp/a.maxHP-c.hp/c.maxHP||a.slot-c.slot)[0];if(t){impact(u,t,power*tune.scrollHeal,true);visual?.buff(u,t,a.skillId);}
    }else if(a.skillId==='royalGuards'){
      for(const g of u.royalGuards.filter(g=>g.hp>0)){const value=g.hp*tune.royalShieldValue;g.shield=Math.max(g.shield,value);g.shieldLeft=tune.royalShieldDuration;const t=[...allies].sort((a,c)=>distance(g,a)-distance(g,c)||a.slot-c.slot)[0];if(t){t.shield=Math.max(t.shield||0,value);t.shieldLeft=Math.max(t.shieldLeft||0,tune.royalShieldDuration);visual?.buff(u,t,a.skillId);}}
    }else if(a.skillId==='royalMarksmen'){
      const t=[...enemies].sort((a,c)=>distance(u,a)-distance(u,c)||a.slot-c.slot)[0];if(t){schedule(u,[t],power*tune.marksmenDamage,a.skillId,tune.marksmenHits,tune.marksmenInterval);for(const h of b.skillHits)if(h.source===u&&h.skill===a.skillId&&h.token===u.castToken)h.marksman=true;}
    }else if(a.skillId==='fracturedReality'){
      for(const t of enemies)hit(u,t,power*tune.fracturedDamage,a.skillId);gainCausal(u,tune.fracturedDrift);
    }else if(a.skillId==='astralDesolation'){
      b.corrosiveDecrees??=[];
      for(const t of enemies){hit(u,t,power*tune.astralDamage,a.skillId);if(t.hp>0){b.corrosiveDecrees=b.corrosiveDecrees.filter(e=>e.source!==u||e.target!==t);b.corrosiveDecrees.push({source:u,target:t,amount:power*tune.corrosiveDamage,left:tune.corrosiveDuration,clock:0});}}
    }else if(a.skillId==='sanctimony'){
      const consumed=u.divineShield||0;u.divineShield=0;
      if(consumed>0)for(const t of enemies)hit(u,t,Math.min(consumed*tune.sanctimonyDamage,power*tune.sanctimonyCap),a.skillId);
      u.divineShield=Math.round(u.maxHP*tune.sanctimonyShield);u.divineRecovering=false;u.divineRecoveryLeft=0;visual?.buff(u,u,a.skillId);
    }else if(a.skillId==='prayerProtection'){
      const chosen=[...allies].sort((p,q)=>(u.side===0?q.x-p.x:p.x-q.x)||p.slot-q.slot)[0];
      if(chosen){u.prayerTargetSlot=chosen.slot;u.prayerToken=u.castToken;u.channelLeft=tune.prayerDuration;visual?.buff(u,chosen,a.skillId);}
    }else if(a.skillId==='eluardJudgment'){
      b.skillHits.push({source:u,targets:[],judgment:true,amount:power*tune.eluardJudgmentDamage,skill:a.skillId,left:tune.eluardJudgmentWindup,token:u.castToken,control:0});u.channelLeft=tune.eluardJudgmentWindup;
    }else if(a.skillId==='auraHaste'){
      for(const t of within(enemies,u,tune.auraHasteRadius))hit(u,t,power*tune.auraHasteDamage,a.skillId);
      b.oscarAuras??=[];b.oscarAuras=b.oscarAuras.filter(e=>e.source!==u);b.oscarAuras.push({source:u,x:u.x,y:u.y,left:tune.auraHasteDuration});
      for(const [dx,dy]of [[-1,0],[1,0],[0,-1],[0,1]])groundKnife(u,u.x+dx*tune.auraHasteRadius*.5,u.y+dy*tune.auraHasteRadius*.5);
    }else if(a.skillId==='fineCuts'){
      for(const t of enemies.filter(t=>distance(u,t)<=tune.fineCutsRange).sort((p,q)=>p.hp/p.maxHP-q.hp/q.maxHP||p.slot-q.slot).slice(0,tune.fineCutsTargets))b.projectiles.push({source:u,target:t,x:u.x,y:u.y-65,amount:power*tune.fineCutsDamage,skillId:a.skillId,spell:true,heal:false,t:0});
    }else if(a.skillId==='sliceDice'){
      const knife=sliceKnife(u);if(knife){b.oscarKnives.splice(b.oscarKnives.indexOf(knife),1);u.x=knife.x;u.y=knife.y;for(const t of within(enemies,u,tune.sliceDiceRadius))hit(u,t,power*tune.sliceDiceDamage,a.skillId);}
    }else if(a.skillId==='unfazed'){
      for(const [id,v]of Object.entries(u.buffs||{})){if(v.left<=0)continue;const negative=['weaken','slow','vulnerable'].some(k=>v[k]>0)||v.fromSide!==undefined&&v.fromSide!==u.side;if(!negative)continue;for(const key of ['weaken','slow','vulnerable'])delete v[key];if(v.fromSide!==undefined&&v.fromSide!==u.side)delete v.fromSide;if(!Object.keys(v).some(k=>k!=='left'))delete u.buffs[id];}
      u.unfazedActive=true;visual?.buff(u,u,a.skillId);
    }else if(a.skillId==='barrelBomb'){
      if(target&&distance(u,target)<=tune.barrelRange)b.projectiles.push({source:u,target,x:u.x,y:u.y-65,amount:power,skillId:a.skillId,spell:true,heal:false,t:0});
    }else if(a.skillId==='fireBreath'){
      for(const t of within(enemies,u,tune.fireBreathRange).filter(t=>(t.x-u.x)*u.facing>=0)){hit(u,t,power*tune.fireBreathDamage,a.skillId);buff(u,t,a.skillId,{weaken:tune.fireBreathWeaken},tune.fireBreathDuration);}
    }else if(a.skillId==='drunkenFrenzy'){
      if(!(u.frenzyLeft>0)){u.frenzyStacks=Math.min(tune.frenzyStacks,u.frenzyStacks+1);if(u.frenzyStacks>=tune.frenzyStacks)u.frenzyLeft=tune.frenzyDuration;visual?.buff(u,u,a.skillId);}
    }else if(a.skillId==='judgementDay'){
      const chosen=[...enemies].sort((p,q)=>sinCount(u,q)-sinCount(u,p)||p.slot-q.slot)[0];
      if(chosen){const count=sinCount(u,chosen);hit(u,chosen,power*(tune.judgementDamage+(count>=tune.sinCap?tune.judgementBonus:0)),a.skillId,count>=tune.sinStunThreshold?tune.judgementStun:0);markSin(u,chosen,1);}
    }else if(a.skillId==='bladePurification'){
      if(target&&distance(u,target)<=tune.meleeRange+tune.rangeHysteresis){const count=sinCount(u,target);markSin(u,target,1);schedule(u,[target],power*tune.purifyingDamage*(1+count*tune.purifyingBonus),a.skillId,tune.purifyingHits,tune.purifyingInterval);}
    }else if(a.skillId==='devilTrap'){
      b.devilTraps??=[];b.devilTraps=b.devilTraps.filter(e=>e.source!==u);
      b.devilTraps.push({source:u,x:u.x,y:u.y,amount:power*tune.devilTrapDamage,left:tune.devilTrapDuration,inside:within(enemies,u,tune.devilTrapRadius),triggered:[]});
    }else if(a.skillId==='motivation'){
      const followed=followTarget(u);if(followed){for(const id of Object.keys(followed.skillTimers||{}))followed.skillTimers[id]=Math.max(0,followed.skillTimers[id]-tune.motivationAdvance);if(Object.keys(followed.skillTimers||{}).length)followed.skillCD=nextCooldown(followed);else followed.skillCD=Math.max(0,(followed.skillCD||0)-tune.motivationAdvance);visual?.buff(u,followed,a.skillId);}
    }else if(a.skillId==='afternoonTea'){
      const followed=followTarget(u);if(followed){impact(u,followed,power*tune.teaHeal,true);visual?.buff(u,followed,a.skillId);}
    }else if(a.skillId==='crazyCrockery'){
      const followed=followTarget(u),preferred=followed?.target;
      const chosen=preferred?.hp>0&&!(preferred.banishLeft>0)&&enemies.includes(preferred)&&distance(u,preferred)<=tune.crockeryRange?preferred:enemies.filter(t=>distance(u,t)<=tune.crockeryRange).sort((p,q)=>distance(u,p)-distance(u,q))[0];
      if(chosen)for(let n=0;n<tune.crockeryHits;n++)b.skillHits.push({source:u,targets:[chosen],amount:power*tune.crockeryDamage,skill:a.skillId,crockery:true,left:n*tune.crockeryInterval,token:u.castToken,control:tune.crockeryStun});
      if(chosen)u.channelLeft=(tune.crockeryHits-1)*tune.crockeryInterval;
    }else if(a.skillId==='springCleaning'){
      const followed=followTarget(u);if(followed){for(let n=0;n<Math.ceil(tune.cleaningDuration/tune.cleaningInterval);n++)b.skillHits.push({source:u,targets:[],followed,cleaning:true,amount:power*tune.cleaningDamage,skill:a.skillId,left:n*tune.cleaningInterval,token:u.castToken,control:0});u.cleaningToken=u.castToken;u.channelLeft=tune.cleaningDuration;}
    }else if(a.skillId==='divineArrow'){
      for(const t of enemies.filter(t=>inEnemyHalf(u,t))){hit(u,t,power*tune.divineArrowDamage,a.skillId);if(t.hp>0)buff(u,t,a.skillId,{weaken:tune.divineArrowWeaken},tune.divineArrowDuration);}
    }else if(a.skillId==='dazzle'){
      for(let n=0;n<tune.dazzlePulses;n++)b.skillHits.push({source:u,targets:[],coins:true,amount:0,skill:a.skillId,left:n*tune.dazzleInterval,token:u.castToken,control:0});
      u.channelLeft=(tune.dazzlePulses-1)*tune.dazzleInterval;
    }else if(a.skillId==='avianAssault'){
      const chosen=enemies.filter(t=>distance(u,t)<=tune.avianRange).sort((p,q)=>distance(u,p)-distance(u,q))[0];
      if(chosen)schedule(u,[chosen],power*tune.avianDamage,a.skillId,tune.avianHits,tune.avianInterval);
    }else if(a.skillId==='cripplingBlow'){
      const lost=Math.max(0,Math.min(1,1-u.hp/u.maxHP));
      const duration=Math.min(tune.cripplingBlowStunCap,tune.cripplingBlowStun+Math.floor((lost+Number.EPSILON)/tune.cripplingBlowLostStep)*tune.cripplingBlowStunStep);
      for(const t of within(enemies,u,tune.cripplingBlowRadius))hit(u,t,power*tune.cripplingBlowDamage,a.skillId,duration);
    }else if(a.skillId==='shieldBash'){
      if(target&&distance(u,target)<=tune.meleeRange+tune.rangeHysteresis){
        const canPush=bonus(target,'controlImmune')<=0&&target.action?.skillId!=='royalCharge';
        hit(u,target,power*tune.shieldBashDamage,a.skillId,tune.shieldBashStun);
        if(target.hp>0&&canPush){const dx=target.x-u.x,dy=target.y-u.y,d=Math.hypot(dx,dy);target.x=Math.max(tune.arenaLeft,Math.min(tune.arenaRight,target.x+(d?dx/d:u.facing)*tune.shieldBashPush));target.y=Math.max(tune.arenaTop,Math.min(tune.arenaBottom,target.y+(d?dy/d:0)*tune.shieldBashPush));}
      }
    }else if(a.skillId==='eviscerate'){
      for(let n=0;n<tune.eviscerateHits;n++)b.skillHits.push({source:u,targets:[],randomEnemy:true,amount:power*tune.eviscerateDamage,skill:a.skillId,left:n*tune.eviscerateInterval,token:u.castToken,control:0});
      u.channelLeft=(tune.eviscerateHits-1)*tune.eviscerateInterval;u.eviscerateToken=u.castToken;
    }else if(a.skillId==='lunge'){
      if(target&&distance(u,target)<=tune.meleeRange+tune.rangeHysteresis)hit(u,target,power*tune.lungeDamage,a.skillId);
      buff(u,u,'lunge',{crit:tune.lungeCrit},tune.lungeDuration);
    }else if(a.skillId==='execution'){
      u.executionAuthorized=false;
      if(target){
        for(let n=0;n<tune.executionLeadHits;n++)b.skillHits.push({source:u,targets:[target],amount:power*tune.executionLeadDamage,skill:a.skillId,left:n*tune.executionInterval,token:u.castToken,control:0});
        b.skillHits.push({source:u,targets:[target],amount:power*tune.executionFinish+target.maxHP*tune.executionMaxHP,skill:a.skillId,left:tune.executionLeadHits*tune.executionInterval,token:u.castToken,control:0});
        u.channelLeft=tune.executionLeadHits*tune.executionInterval;
      }
    }else if(a.skillId==='heavensProtection'){
      for(const t of allies){t.shield=Math.max(t.shield||0,Math.round(power*tune.heavensProtectionShield));t.shieldLeft=tune.heavensProtectionDuration;visual?.buff(u,t,a.skillId);}
      if(u.buffs?.blessedShield)delete u.buffs.blessedShield;u.channelLeft=0;
    }else if(a.skillId==='divineBlessing'){
      const chosen=[...allies].sort((p,q)=>p.hp/p.maxHP-q.hp/q.maxHP)[0];
      if(chosen){impact(u,chosen,power*tune.divineBlessingHeal,true);buff(u,chosen,a.skillId,{reduction:tune.divineBlessingReduction},tune.divineBlessingDuration);}
    }else if(a.skillId==='blessedShield'){
      buff(u,u,a.skillId,{reduction:tune.blessedShieldReduction,controlImmune:1},tune.blessedShieldDuration);u.channelLeft=tune.blessedShieldDuration;
    }else if(a.skillId==='cripple'){
      for(const t of enemies)buff(u,t,'cripple',{vulnerable:tune.crippleVulnerability,fromSide:u.side},tune.crippleDuration);
    }else if(a.skillId==='lockOn'){
      const chosen=[...enemies].sort((p,q)=>p.hp-q.hp)[0];if(chosen)buff(u,chosen,'lockOn',{fromSide:u.side},tune.lockOnDuration);
    }else if(a.skillId==='purification'){
      for(const t of enemies){for(const [id,v]of Object.entries(t.buffs||{}))if(v.attack||v.crit||v.haste||v.reduction||v.controlImmune){delete t.buffs[id];if(id==='blessedShield')t.channelLeft=0;}t.shield=0;t.shieldLeft=0;hit(u,t,power*tune.purificationDamage,a.skillId);}
    }else if(a.skillId==='confine'){
      const chosen=[...enemies].sort((p,q)=>q.attack*(1+bonus(q,'attack'))-p.attack*(1+bonus(p,'attack')))[0];
      if(chosen){hit(u,chosen,power*tune.confineDamage,a.skillId);if(chosen.hp>0&&bonus(chosen,'controlImmune')<=0&&chosen.action?.skillId!=='royalCharge'){if(kitKey(chosen)==='oscar')chosen.unfazedActive=false;chosen.banishLeft=tune.confineDuration;chosen.action=null;chosen.channelLeft=0;chosen.moving=false;chosen.castToken++;visual?.buff(u,chosen,a.skillId);}}
    }else if(a.skillId==='inspire'){for(const t of allies)buff(u,t,'inspire',{attack:tune.inspireAttack},tune.inspireDuration);}
    else if(a.skillId==='blessing'){
      const chosen=[...allies].sort((p,q)=>q.attack*(1+bonus(q,'attack'))-p.attack*(1+bonus(p,'attack')))[0];
      if(chosen)buff(u,chosen,'blessing',{attack:tune.blessingAttack,crit:tune.blessingCrit},tune.blessingDuration);
    }else if(target){
      if(a.skillId==='divineStrike'){
        for(const t of within(enemies,u,tune.divineStrikeRange))hit(u,t,power*tune.divineStrikeDamage,a.skillId,tune.knockdownSeconds);
      }else if(a.skillId==='abate'){
        buff(u,target,'abate',{slow:tune.abateSlow},tune.abateDuration);
      }else if(a.skillId==='barrage'){
        const eligible=enemies.filter(t=>distance(u,t)<=tune.barrageRange);
        const low=[...eligible].sort((p,q)=>p.hp-q.hp)[0],high=[...eligible].sort((p,q)=>q.attack-p.attack)[0];
        if(low)schedule(u,[low],power*tune.barrageLowDamage,a.skillId,tune.barrageHits,tune.multiHitInterval);
        if(high){schedule(u,[high],power*tune.barrageHighDamage,a.skillId,tune.barrageHits,tune.multiHitInterval);buff(u,high,'barrageSlow',{slow:tune.barrageSlow},tune.barrageSlowDuration);}
      }else if(a.skillId==='joust'){
        const targets=within(enemies,u,tune.joustRange).filter(t=>(t.x-u.x)*u.facing>=-tune.joustBehind);
        schedule(u,targets,power*tune.joustHit,'joust',tune.joustHits,tune.multiHitInterval,{amount:power*tune.joustFinish});
      }else if(a.skillId==='royalCharge'){
        const origin={x:a.originX,y:a.originY},dx=u.x-origin.x,dy=u.y-origin.y,len2=dx*dx+dy*dy;
        for(const t of enemies){const f=len2?Math.max(0,Math.min(1,((t.x-origin.x)*dx+(t.y-origin.y)*dy)/len2)):0;const point={x:origin.x+dx*f,y:origin.y+dy*f};if(distance(t,point)<=tune.royalChargeWidth)hit(u,t,power*tune.royalChargeDamage,'royalCharge',tune.knockdownSeconds);}
      }else if(a.skillId==='ridicule'){
        hit(u,target,power*tune.ridiculePrimary,'ridicule',tune.knockdownSeconds);
        for(const t of within(enemies,target,tune.ridiculeRadius)){hit(u,t,power*tune.ridiculeArea,'ridicule');if(t.hp>0)buff(u,t,'ridicule',{weaken:tune.ridiculeWeaken},tune.ridiculeDuration);}
      }else if(a.skillId==='divineLight'){
        schedule(u,within(enemies,target,tune.divineLightRadius),power*tune.divineLightHit,'divineLight',tune.divineLightHits,tune.multiHitInterval);
      }else if(a.skillId==='divineRetribution'){
        b.projectiles.push({source:u,target,x:u.x,y:u.y-65,amount:power*tune.divineRetributionDamage,heal:false,spell:true,skillId:a.skillId,t:0});
      }
    }
    visual?.release(u,a);
    emit({type:'skill-resolved',actor:u.name,skill:a.skillId,time:b.elapsed});return true;
  }
  /** Roll elemental conversions at release; only a projectile arrival applies damage or burns. */
  function normalAttack(u,target,amount){
    if(kitKey(u)==='walker'){
      if(!target||target.hp<=0||target.banishLeft>0||target.entryLeft>0||u.reloadLeft>0)return true;
      battle().projectiles.push({source:u,target,x:u.x,y:u.y-65,amount,heal:false,normal:true,spell:false,skillId:'walkerShell',enhanced:u.saloonLeft>0,t:0});
      if(!(u.saloonLeft>0)){u.shotgunAmmo--;if(u.shotgunAmmo<=0)u.reloadLeft=tune.shotgunReload;}return true;
    }
    if(kitKey(u)!=='gwyneth')return false;
    if(!target||target.hp<=0||target.banishLeft>0||target.entryLeft>0)return true;
    const flaming=rng()<tune.flamingChance,lightning=rng()<tune.lightningChance;
    battle().projectiles.push({source:u,target,x:u.x,y:u.y-65,amount,heal:false,normal:true,spell:false,skillId:'gwynethArrow',flaming,lightning,t:0});
    return true;
  }
  /** Refresh one burn per source and destination; a released status outlives its caster. */
  function applyBurn(source,target,power,skill='flamingArrows',damage=tune.burnDamage,duration=tune.burnDuration,interval=tune.burnInterval){
    const b=battle();b.burns??=[];b.burns=b.burns.filter(e=>e.source!==source||e.target!==target||e.skill!==skill);
    b.burns.push({source,target,skill,interval,amount:power*damage,left:duration,clock:0});
  }
  /** Released projectiles resolve once on arrival, including after caster death. */
  function projectileImpact(p){
    if(['walkerShell','gunslinger','spittoonSmack'].includes(p.skillId)){
      if(p.target.hp<=0||p.target.banishLeft>0||p.target.entryLeft>0)return true;
      if(p.skillId==='walkerShell'){
        const targets=within(foes(p.source,battle()),p.target,tune.shotgunRadius).sort((a,c)=>a.slot-c.slot);hit(p.source,p.target,p.amount*tune.shotgunDamage,'saloonBlast');
        if(p.enhanced)for(const t of targets)hit(p.source,t,p.amount*tune.shotgunEnhancedDamage,'saloonBlast');
        const count=p.enhanced?tune.shotgunEnhancedPellets:tune.shotgunPellets;for(let n=0;n<count&&targets.length;n++)hit(p.source,targets[n%targets.length],p.amount*tune.shotgunPelletDamage,'saloonBlast',0,{noCrit:true});
      }else hit(p.source,p.target,p.amount,p.skillId,0,p.skillId==='gunslinger'?{crit:p.target.hp/p.target.maxHP<tune.gunslingerThreshold?tune.gunslingerCrit:0}:null);return true;
    }
    if(p.skillId==='royalMarksmen'){
      if(p.target.hp<=0||p.target.banishLeft>0||p.target.entryLeft>0)return true;
      if(inEnemyHalf(p.source,p.target)&&rng()<Math.min(tune.marksmenMissMax,distance(p.source,p.target)/tune.marksmenDistance*tune.marksmenMissMax)){emit({type:'skill-miss',actor:p.source.name,target:p.target.name,skill:p.skillId});return true;}
      hit(p.source,p.target,p.amount,p.skillId);buff(p.source,p.target,p.skillId,{weaken:tune.marksmenWeaken,slow:tune.marksmenSlow,fromSide:p.source.side},tune.marksmenDebuffDuration);return true;
    }
    if(p.skillId==='fineCuts'){
      if(p.target.hp<=0||p.target.banishLeft>0||p.target.entryLeft>0)return true;
      groundKnife(p.source,p.target.x,p.target.y);hit(p.source,p.target,p.amount,p.skillId);return true;
    }
    if(p.skillId==='barrelBomb'){
      if(p.target.hp<=0||p.target.banishLeft>0||p.target.entryLeft>0)return true;
      const b=battle();b.barrelBlasts??=[];b.barrelBlasts.push({source:p.source,x:p.target.x,y:p.target.y,amount:p.amount,left:tune.barrelFuse});hit(p.source,p.target,p.amount*tune.barrelImpact,p.skillId);return true;
    }
    if(p.skillId==='crazyCrockery'){if(p.target.hp>0&&!(p.target.banishLeft>0))hit(p.source,p.target,p.amount,p.skillId,tune.crockeryStun);return true;}
    if(p.skillId==='gwynethArrow'){
      if(p.target.hp<=0||p.target.banishLeft>0)return true;
      const targets=p.lightning?within(foes(p.source,battle()),p.target,tune.lightningRadius):[p.target];
      const skill=p.lightning?'lightningArrows':p.flaming?'flamingArrows':'gwynethArrow';
      const multiplier=p.lightning?tune.lightningDamage:p.flaming?tune.flamingDamage:1;
      for(const t of targets){hit(p.source,t,p.amount*multiplier,skill);if(p.flaming&&t.hp>0)applyBurn(p.source,t,p.amount);}
      for(const id of [p.flaming?'flamingArrows':null,p.lightning?'lightningArrows':null].filter(Boolean)){
        p.source.castCounts[id]=(p.source.castCounts[id]||0)+1;emit({type:'skill-passive',actor:p.source.name,skill:id});
        if(p.flaming&&p.lightning&&id==='flamingArrows')visual?.hit(p.source,p.target,id);
      }
      return true;
    }
    if(p.skillId==='protoBolt'){hit(p.source,p.target,p.amount,p.skillId);return true;}
    if(p.skillId!=='divineRetribution')return false;
    if(p.target.hp>0)for(const t of within(foes(p.source,battle()),p.target,tune.divineRetributionRadius))hit(p.source,t,p.amount,p.skillId);
    return true;
  }
  /** Tick with simulation time only; pause does not call this method. */
  function tick(b,dt){
    for(const key of ['oscarKnives','oscarAuras'])if(b[key])b[key]=b[key].filter(e=>{e.left=Math.max(0,e.left-dt);return e.left>0;});
    for(const u of [...b.heroes,...b.enemies]){
      if(kitKey(u)==='walker'&&u.hp>0){u.saloonLeft=Math.max(0,u.saloonLeft-dt);if(u.reloadLeft>0){u.reloadLeft=Math.max(0,u.reloadLeft-dt);if(u.reloadLeft<Number.EPSILON*1024){u.reloadLeft=0;u.shotgunAmmo=tune.shotgunMagazine;}}}
      if(kitKey(u)==='peggy')tickGuards(u,b,dt);
      if(kitKey(u)==='eluard-awakened'){
        u.fateClock+=dt;if(u.fateClock+Number.EPSILON*1024>=tune.fateWindow){u.fateClock=Math.max(0,u.fateClock-Math.floor((u.fateClock+Number.EPSILON*1024)/tune.fateWindow)*tune.fateWindow);u.fateChecks={};u.fateTotal=0;}
        if(u.hp>0&&!(u.banishLeft>0)&&!(u.entryLeft>0)){
          const pulses=u.causalPulses;u.causalPulses=0;for(let n=0;n<pulses;n++)for(const t of alive(foes(u,b)))hit(u,t,u.attack*tune.causalDamage,'fracturedReality');
          if(u.realmActive){u.realmClock+=dt;while(u.realmClock+Number.EPSILON*1024>=tune.fracturedInterval){u.realmClock-=tune.fracturedInterval;for(const t of alive(foes(u,b))){t.shield=0;t.shieldLeft=0;if(t.divineShield>0)absorbDivine(t,t.divineShield);hit(u,t,u.attack*tune.fracturedRealmDamage,'fracturedReality');}}}
        }
      }
      if(kitKey(u)==='rigby'){
        if(u.hp<=0){u.frenzyStacks=0;u.frenzyLeft=0;u.restedLeft=0;u.restedClock=0;}
        else if(u.frenzyLeft>0){u.frenzyLeft=Math.max(0,u.frenzyLeft-dt);if(u.frenzyLeft===0){u.frenzyStacks=0;u.restedLeft=tune.restedDuration;u.restedClock=0;u.castCounts.wellRested=(u.castCounts.wellRested||0)+1;visual?.buff(u,u,'wellRested');}}
        else if(u.restedLeft>0){u.restedClock+=Math.min(dt,u.restedLeft);u.restedLeft=Math.max(0,u.restedLeft-dt);while(u.restedClock+Number.EPSILON*1024>=tune.restedInterval){u.restedClock-=tune.restedInterval;if(!(u.banishLeft>0)&&!(u.entryLeft>0)){impact(u,u,u.maxHP*tune.restedHeal,true);visual?.buff(u,u,'wellRested');}}}
      }
      if(kitKey(u)==='cecilia')arrive(u,b,dt);
      if(kitKey(u)==='rosaline')u.followSlot=followTarget(u)?.slot??null;
      if(kitKey(u)==='rowan')supplies(u,b,dt);
      if(kitKey(u)==='hendrik'){
        u.guardLeft=Math.max(0,u.guardLeft-dt);
        if(u.standfastLeft>0){
          if(u.hp<=0||u.banishLeft>0||u.controlLeft>0||u.hp>=Math.round(u.maxHP*tune.standfastEndHP))endStandfast(u);
          else{
            u.standfastClock+=Math.min(dt,u.standfastLeft);u.standfastLeft=Math.max(0,u.standfastLeft-dt);
            while(u.standfastClock+Number.EPSILON>=tune.standfastInterval){
              u.standfastClock-=tune.standfastInterval;
              impact(u,u,Math.min(u.maxHP*tune.standfastHeal,Math.max(0,u.maxHP*tune.standfastEndHP-u.hp)),true);
              if(u.hp>=Math.round(u.maxHP*tune.standfastEndHP))break;
            }
            if(u.standfastLeft===0||u.hp>=Math.round(u.maxHP*tune.standfastEndHP))endStandfast(u);
          }
        }
      }
      u.banishLeft=Math.max(0,(u.banishLeft||0)-dt);
      if(kitKey(u)==='eluard'&&u.divineRecovering&&u.hp>0){u.divineRecoveryLeft=Math.max(0,u.divineRecoveryLeft-dt);if(u.divineRecoveryLeft<Number.EPSILON*1024)u.divineRecoveryLeft=0;if(u.divineRecoveryLeft===0&&!(u.banishLeft>0)&&!(u.entryLeft>0)){u.divineShield=Math.round(u.maxHP*tune.miracleShield);u.divineRecovering=false;u.castCounts.divineMiracle=(u.castCounts.divineMiracle||0)+1;visual?.buff(u,u,'divineMiracle');}}
      if(u.shieldLeft>0){u.shieldLeft=Math.max(0,u.shieldLeft-dt);if(u.shieldLeft===0)u.shield=0;}
      for(const buff of Object.values(u.buffs||{}))buff.left=Math.max(0,buff.left-dt);
      u.controlLeft=Math.max(0,(u.controlLeft||0)-dt);u.channelLeft=Math.max(0,(u.channelLeft||0)-dt);
      if(u.buffs?.blessedShield&&((u.skillTimers.heavensProtection??Infinity)<=dt||u.buffs.blessedShield.left<=0)){delete u.buffs.blessedShield;u.channelLeft=0;}
      if(u.hp<=0||u.banishLeft>0||u.entryLeft>0)continue;
      for(const id of Object.keys(u.skillTimers||{}))u.skillTimers[id]-=dt;
      if(kit(u).length)u.skillCD=nextCooldown(u);
    }
    if(b.devilTraps)b.devilTraps=b.devilTraps.filter(e=>{
      e.left=Math.max(0,e.left-dt);if(e.left===0)return false;
      const valid=alive(foes(e.source,b)),inside=within(valid,e,tune.devilTrapRadius);
      for(const t of e.inside)if(valid.includes(t)&&!inside.includes(t)&&!e.triggered.includes(t)){e.triggered.push(t);hit(e.source,t,e.amount,'devilTrap');}
      e.inside=inside;return true;
    });
    if(b.corrosiveDecrees)b.corrosiveDecrees=b.corrosiveDecrees.filter(e=>{
      if(e.target.hp<=0)return false;e.clock+=Math.min(dt,e.left);e.left=Math.max(0,e.left-dt);
      while(e.clock+Number.EPSILON*1024>=tune.corrosiveInterval){e.clock-=tune.corrosiveInterval;if(!(e.target.banishLeft>0)&&!(e.target.entryLeft>0)){hit(e.source,e.target,e.amount,'astralDesolation');if(e.target.hp>0)stripAstral(e.source,e.target);}}
      return e.left>Number.EPSILON*1024&&e.target.hp>0;
    });
    if(b.burns)b.burns=b.burns.filter(e=>{
      if(e.target.hp<=0)return false;
      e.clock+=Math.min(dt,e.left);e.left=Math.max(0,e.left-dt);
      const interval=e.interval??tune.burnInterval;while(e.clock+Number.EPSILON*1024>=interval){e.clock-=interval;if(!(e.target.banishLeft>0))hit(e.source,e.target,e.amount,e.skill||'flamingArrows');if(e.target.hp<=0)break;}
      return e.left>0&&e.target.hp>0;
    });
    if(b.barrelBlasts)b.barrelBlasts=b.barrelBlasts.filter(e=>{
      e.left=Math.max(0,e.left-dt);if(e.left>0)return true;
      for(const t of within(foes(e.source,b),e,tune.barrelRadius)){hit(e.source,t,e.amount*tune.barrelExplosion,'barrelBomb');if(t.hp>0)applyBurn(e.source,t,e.amount,'barrelBomb',tune.barrelBurnDamage,tune.barrelBurnDuration,tune.barrelBurnInterval);}return false;
    });
    if(!b.skillHits)return;
    b.skillHits=b.skillHits.filter(h=>{
      if(h.source.hp<=0||h.source.banishLeft>0||h.token!==h.source.castToken)return false;
      h.left-=dt;if(h.left>0)return true;
      if(h.walkerFollow){for(const t of h.targets)if(t.hp>0&&!(t.banishLeft>0)&&!(t.entryLeft>0))b.projectiles.push({source:h.source,target:t,x:h.source.x,y:h.source.y-65,amount:h.amount,skillId:h.skill,spell:false,heal:false,t:0});return false;}
      if(h.marksman){for(const t of h.targets)if(t.hp>0&&!(t.banishLeft>0)&&!(t.entryLeft>0))b.projectiles.push({source:h.source,target:t,x:h.source.x,y:h.source.y-65,amount:h.amount,skillId:h.skill,spell:false,heal:false,t:0});return false;}
      if(h.judgment){for(const t of alive(foes(h.source,b)))hit(h.source,t,h.amount*(1+(t.slainSides?.[h.source.side]||0)*tune.eluardJudgmentBonus),h.skill);return false;}
      if(h.crockery){for(const t of h.targets)if(t.hp>0&&!(t.banishLeft>0)&&distance(h.source,t)<=tune.crockeryRange)b.projectiles.push({source:h.source,target:t,x:h.source.x,y:h.source.y-65,amount:h.amount,skillId:h.skill,spell:true,heal:false,t:0});return false;}
      if(h.cleaning){
        if(h.followed.hp<=0||h.followed.banishLeft>0)return false;
        for(const t of within(foes(h.source,b),h.followed,tune.cleaningRadius)){
          hit(h.source,t,h.amount,h.skill);
          if(t.hp>0&&h.followed.slot>=2&&bonus(t,'controlImmune')<=0&&t.action?.skillId!=='royalCharge'){
            const dx=t.x-h.followed.x,dy=t.y-h.followed.y,d=Math.hypot(dx,dy);t.x=Math.max(tune.arenaLeft,Math.min(tune.arenaRight,t.x+(d?dx/d:h.source.facing)*tune.cleaningPush));t.y=Math.max(tune.arenaTop,Math.min(tune.arenaBottom,t.y+(d?dy/d:0)*tune.cleaningPush));
          }
        }return false;
      }
      if(h.coins){
        const candidates=alive([...b.heroes,...b.enemies]);
        for(let n=0;n<tune.dazzleTargets&&candidates.length;n++){
          const at=Math.min(candidates.length-1,Math.floor(rng()*candidates.length)),target=candidates.splice(at,1)[0];
          if(target.side===h.source.side){buff(h.source,target,'dazzle',{attack:tune.dazzleAttack},tune.dazzleDuration);buff(h.source,target,'dazzleEnergyAdaptation',{haste:tune.dazzleHaste},tune.dazzleHasteDuration);}
          else{stun(target,tune.dazzleStun);visual?.hit(h.source,target,'dazzle');}
        }
        return false;
      }
      const eligible=h.randomEnemy?alive(foes(h.source,b)):null;
      const targets=eligible?(eligible.length?[eligible[Math.min(eligible.length-1,Math.floor(rng()*eligible.length))]]:[]):h.targets;
      for(const t of targets){if(h.skill==='bladePurification'&&distance(h.source,t)>tune.meleeRange+tune.rangeHysteresis)continue;if(h.skill==='avianAssault'&&distance(h.source,t)>tune.avianRange)continue;hit(h.source,t,h.amount,h.skill,h.control);if(h.skill==='avianAssault'&&t.hp>0&&!(t.banishLeft>0))buff(h.source,t,'avianAssault',{weaken:tune.avianWeaken},tune.avianDuration);}return false;
    });
  }
  return{kit,initialize,ready,nextCooldown,cast,resolve,normalAttack,followTarget,sinCount,absorbDivine,negateFatal,interceptGuard,projectileImpact,tick,damage,stun,bonus,guardDamage,afterDamage,incomingDamage};
}
root.HERO_KITS=KITS;root.createHeroSkillSystem=createHeroSkillSystem;
if(typeof module!=='undefined')module.exports={KITS,createHeroSkillSystem};
})(typeof window!=='undefined'?window:globalThis);
