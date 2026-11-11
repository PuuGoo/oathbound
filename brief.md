<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Game Brief: Oathbound — Chiến Dịch Bình Minh *(guessed)*

## In your words
> tôi muốn bạn tạo game turn base tham khảo game afk arena

> Hướng game: gồm 5 anh hùng trên sân đánh với 5 tướng khác là quái chiến dịch. tự động đánh theo lược. Điều khiển trong trận: đội tự đánh theo lượt. Phát triển đội: dùng tài nguyên vàng hoặc các tài liên quan để nâng cấp tướng, tiến hóa tướng. Hình ảnh: '/c/Users/PuuGoo/Desktop/Assets Afk Arena/Heros/Estrilda/Mounted Lancer Animation Sprite Sheet.png' tham khảo này. Độ khó tăng dần theo chương. Phạm vi ban đầu: theo cơ chế đánh map theo chiến dịch https://afk-arena.fandom.com/wiki/Campaign

After play: '/c/Users/PuuGoo/Desktop/Assets Afk Arena/Heros/Estrilda/Mounted Lancer Animation Sprite Sheet.png'tôi muốn tướng import file này vô. đây là file sprite sheets bao gồm idle, attack, hit, death and skills

**Pitch:** Dẫn đội năm anh hùng vượt bản đồ chiến dịch, dùng chiến lợi phẩm nâng cấp và tiến hóa để vượt đội hình địch ngày càng mạnh.
**Genre:** RPG chiến dịch kết hợp chiến đấu tự động theo lượt.
**Controls:** Chuột để chọn ải, đổi vị trí, nâng cấp, tiến hóa và bắt đầu trận; không cần thao tác chiến đấu. Enter bắt đầu, Space đánh, U nâng cấp, E tiến hóa, P tạm dừng. *(inferred (strong); phím guessed)*
**Question:** Đổi đội hình và đầu tư tài nguyên có tạo ra khác biệt rõ ràng khi đánh lại một ải khó? *(guessed)*
**Hooks:** Trận 5v5 có thứ tự lượt rõ ràng; sức mạnh đến từ vị trí, phối hợp kỹ năng và phát triển tướng. *(inferred (strong))*
**Intent:** payoff builds — từ yêu cầu nâng cấp, tiến hóa và chiến dịch khó dần.

## Look and references
- Mood / View: Fantasy cổ tích trang trọng; sân đấu 2D nhìn ngang, hai đội đối diện, camera cố định. *(inferred (strong))*
- Shapes / Values: Năm dáng riêng: kỵ sĩ thương, hộ vệ khiên, xạ thủ, pháp sư và trị liệu; nền dịu để nhân vật và đòn đánh nổi bật. *(guessed)*
- Palette: Xanh hải quân–vàng cho anh hùng, tím than–đỏ cho nguy hiểm; ánh sáng ấm và bóng lạnh. *(inferred (strong))*
- Detail / Rules / Signature: Trang phục nhiều lớp, viền thống nhất, đổ bóng minh họa; vệt sáng theo vũ khí và ấn ký khi tiến hóa; mọi nhân vật được vẽ, không emoji hay hình tròn thay nhân vật. *(guessed)*
- References: Dùng trực tiếp `assets/mounted-lancer.png` (Mounted Lancer Animation Sprite Sheet.png do bạn chỉ định) cho tướng kỵ sĩ trong prototype cục bộ: idle, attack, hit, death và bốn biến thể hình ảnh skill; tọa độ/FPS suy ra từ ảnh, chưa có metadata gốc. Bốn tướng còn lại giữ hình vẽ bằng mã. AFK Arena cho ý tưởng đội hình và chiến dịch; không lấy UI nguyên bản. Trang Campaign trả HTTP 402, nội dung chưa xác minh.

## First minute
Mở bản đồ tại ải 1-1 với đủ năm anh hùng. Bạn xem vai trò, bắt đầu và thấy hai đội tự đánh theo thứ tự lượt. Chiến thắng cộng tài nguyên, gợi ý nâng cấp rồi bước sang ải tiếp. *(guessed)*

## Challenge
Độ khó tăng theo chương. Ải 1-1 dạy đọc trận, 1-3 bắt đầu cần nâng cấp hoặc đổi vị trí, 1-5 có thủ lĩnh; chương 2 phối hợp địch khó hơn. Thua không mất tài nguyên hay tướng, được thử lại. *(chi tiết provisional)*

## Core loop
- Chọn ải đã mở → sắp đội → bắt đầu trận tự động 5v5.
- Thắng → nhận vàng, kinh nghiệm tướng, nguyên liệu tiến hóa → mở ải tiếp.
- Nâng cấp, tiến hóa → thử thách mới; mắc ải thì đánh lại ải cũ lấy tài nguyên. *(chi tiết guessed)*

**Leads:** Auto-battler: bố trí và tự chiến đấu. RPG: lượt, phát triển tướng, chiến dịch. Lựa chọn của bạn ưu tiên mặc định.

## Goal & fail state
Hoàn thành 2 chương × 5 ải. Thua khi cả đội bị hạ hoặc hết giới hạn lượt; giữ tiến trình và thử lại. *(quy mô, giới hạn guessed)*

## Features
- [x] Đội 5 anh hùng đấu 5 địch, bố trí 2 trước / 3 sau; xem kỹ năng trước trận. *(bố trí guessed)*
- [x] Tự đánh theo lượt; hiển thị người sắp hành động, sát thương, hồi máu và trạng thái. *(hiển thị guessed)*
- [x] Năm vai trò phối hợp; ít nhất ba loại địch có hành vi khác nhau. *(guessed)*
- [x] Map 2 chương × 5 ải mở tuần tự, thủ lĩnh cuối chương. *(quy mô guessed)*
- [x] Vàng + kinh nghiệm tăng cấp; nguyên liệu riêng tiến hóa một bậc tăng chỉ số và cải thiện kỹ năng (thin stand-in). *(công thức guessed)*
- [x] Thưởng lần đầu và đánh lại; lưu đội, tài nguyên, ải đã mở trong trình duyệt. *(guessed)*
- [x] Hoạt ảnh chờ, tấn công, trúng đòn, bị hạ; kết quả rõ ràng. Kỵ sĩ dùng trực tiếp sprite sheet đã chỉ định: idle lặp, attack/hit/skill một lần rồi về idle, death giữ khung cuối; bốn hàng skill luân phiên chỉ thay hình ảnh, không thay chỉ số hay hiệu ứng cơ học.

## Your systems
- 5 anh hùng đấu 5 quái chiến dịch · in the slice
- đội tự đánh theo lượt · in the slice
- nâng cấp tướng bằng tài nguyên · thin stand-in *(guessed)*
- tiến hóa tướng · thin stand-in *(guessed)*
- map chiến dịch, độ khó tăng theo chương · in the slice

## Keep

## Avoid
- Không sao chép logo, tên gọi, giao diện hay các nhân vật AFK Arena khác. Ngoại lệ được bạn duyệt: dùng sprite Mounted Lancer đã chỉ định cho kỵ sĩ trong prototype cục bộ; quyền phát hành công khai chưa xác minh.
- Chọn lệnh thủ công trong trận.

## Out of scope
- Nhiều chương, bộ sưu tập lớn: grow it.
- Trang bị, chế tạo, cây tiến hóa nhiều nhánh: add it as a feature.
- PvP, bang hội, đồng bộ tài khoản: cần server, chưa xây.
- Gacha, tài nguyên AFK ngoại tuyến: ngoài bản đầu. *(guessed)*

## Build order
1. Chọn ải → xếp đội → tự đánh → thắng/thua → nhận thưởng → nâng cấp/tiến hóa → ải tiếp hoặc thử lại.

**Kill condition:** Đổi hướng nếu chỉ số quyết định tất cả, vị trí và phối hợp không tạo khác biệt. *(guessed)*
**Who it's for / what they feel:** Người thích nuôi đội, quan sát chiến thuật phát huy, từng bước vượt ải. *(inferred (strong))*
**Games you love / don't:** AFK Arena — chiến dịch, xây đội.
