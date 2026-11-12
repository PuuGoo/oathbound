<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# Game Brief: Oathbound — Chiến Dịch Bình Minh *(guessed)*

## In your words
> tôi muốn bạn tạo game turn base tham khảo game afk arena

> Hướng game: gồm 5 anh hùng trên sân đánh với 5 tướng khác là quái chiến dịch. tự động đánh theo lược. Điều khiển trong trận: đội tự đánh theo lượt. Phát triển đội: dùng tài nguyên vàng hoặc các tài liên quan để nâng cấp tướng, tiến hóa tướng. Hình ảnh: '/c/Users/PuuGoo/Desktop/Assets Afk Arena/Heros/Estrilda/Mounted Lancer Animation Sprite Sheet.png' tham khảo này. Độ khó tăng dần theo chương. Phạm vi ban đầu: theo cơ chế đánh map theo chiến dịch https://afk-arena.fandom.com/wiki/Campaign

After play: '/c/Users/PuuGoo/Desktop/Assets Afk Arena/Heros/Estrilda/Mounted Lancer Animation Sprite Sheet.png'tôi muốn tướng import file này vô. đây là file sprite sheets bao gồm idle, attack, hit, death and skills

After play: /c/Users/PuuGoo/Downloads/Estrilda_GamePlay.mp4 tôi gameplay phải thế này và tướng Estrilda và các tướng khác phải di chuyển spam kĩ năng như thế mới đẹp.

Decision: Bạn chọn chiến đấu thời gian thực, thay cơ chế lượt chung; giữ chiến dịch, 5v5 và phát triển đội. Tên hiển thị kỵ sĩ đổi thành Estrilda. Ban đầu video chưa đọc được; iteration 3 đã giải mã bằng trình duyệt và xem các khung 3/12/22/32 giây. Đã thấy đội hình đổi vị trí, hiệu ứng đồng thời và nhấn mạnh chân dung kỹ năng; chuyển động, âm thanh và độ giống toàn clip chưa được đánh giá.

After play: Bạn yêu cầu import `Belinda’s Radiant Mage Sprite Atlas.png`. Belinda thay hình vẽ và tên pháp sư Orren; giữ ID `mage`, vị trí lưu, cấp, tiến hóa và cơ chế sát thương diện rộng. Atlas nền trắng được tạo bản nền trong suốt và cắt từng khung không đều; ảnh gốc giữ nguyên. Các hàng/FPS và tên kỹ năng hiển thị là suy luận cho prototype, không phải metadata hoặc bộ kỹ năng AFK Arena chính thức.

**Pitch:** Dẫn đội năm anh hùng vượt bản đồ chiến dịch, dùng chiến lợi phẩm nâng cấp và tiến hóa để vượt đội hình địch ngày càng mạnh.
**Genre:** RPG chiến dịch kết hợp chiến đấu tự động thời gian thực.
**Controls:** Chuột chọn ải và chọn tướng để xem/nâng cấp; nút **Xếp đội** bật chế độ chọn hai tướng đổi vị trí, **Xong xếp đội** thoát và hủy cặp chưa hoàn tất. Chọn tướng thông thường không đổi đội hình. Không cần thao tác chiến đấu. ←/→ chọn ải trước/sau đã mở, tự chuyển chương tương ứng. Enter bắt đầu, Space đánh, U nâng cấp, E tiến hóa, P tạm dừng. *(phím guessed)*
**Question:** Đổi đội hình và đầu tư tài nguyên có tạo ra khác biệt rõ ràng khi đánh lại một ải khó? *(guessed)*
**Hooks:** Trận 5v5 di chuyển và giao tranh đồng thời; từng tướng có nhịp đánh và hồi kỹ năng riêng, sức mạnh đến từ vị trí, phối hợp kỹ năng và phát triển tướng.
**Intent:** payoff builds — từ yêu cầu nâng cấp, tiến hóa và chiến dịch khó dần.

## Look and references
- Mood / View: Fantasy cổ tích trang trọng; sân đấu 2D nhìn ngang, hai đội đối diện, camera cố định. *(inferred (strong))*
- Shapes / Values: Năm dáng riêng: kỵ sĩ thương, hộ vệ khiên, xạ thủ, pháp sư và trị liệu; nền dịu để nhân vật và đòn đánh nổi bật. *(guessed)*
- Palette: Xanh hải quân–vàng cho anh hùng, tím than–đỏ cho nguy hiểm; ánh sáng ấm và bóng lạnh. *(inferred (strong))*
- Detail / Rules / Signature: Trang phục nhiều lớp, viền thống nhất, đổ bóng minh họa; vệt sáng theo vũ khí và ấn ký khi tiến hóa; mọi nhân vật được vẽ, không emoji hay hình tròn thay nhân vật. *(guessed)*
- References: Dùng trực tiếp `assets/mounted-lancer.png` (Mounted Lancer Animation Sprite Sheet.png do bạn chỉ định) cho Estrilda trong prototype cục bộ: idle, attack, hit, death và bốn biến thể hình ảnh skill; tọa độ/FPS suy ra từ ảnh, chưa có metadata gốc. Chưa xác nhận hàng chạy: khi di chuyển dùng idle + nhún/vệt bụi; kỹ năng có lao tới mục tiêu. Belinda dùng `assets/belinda-mage.png`, bản dẫn xuất nền trong suốt từ atlas bạn cung cấp, thay Orren ở vị trí pháp sư; giữ nguyên tiến trình và cơ chế. Ba tướng còn lại giữ hình vẽ bằng mã, có di chuyển và thi triển tự động. AFK Arena cho ý tưởng đội hình và chiến dịch; không lấy UI nguyên bản. Trang Campaign trả HTTP 402, nội dung chưa xác minh.

## First minute
Mở bản đồ tại ải 1-1 với đủ năm anh hùng. Bạn xem vai trò, bắt đầu và thấy cận chiến áp sát, đánh xa tiến/lùi giữ cự ly, kỹ năng liên tục chồng nhịp giữa hai đội. Chiến thắng cộng tài nguyên, gợi ý nâng cấp rồi bước sang ải tiếp. *(chi tiết guessed)*

## Challenge
Độ khó tăng theo chương theo cấu hình; cuối mỗi chương có thủ lĩnh. Ý định ban đầu là tạo nhu cầu nâng cấp hoặc đổi vị trí từ khoảng ải 1-3, nhưng kiểm tra seed 617 đã quan sát đội cấp 1 chưa nâng cấp vượt 1-1 đến 1-4 (`evidence/iteration-18-review.md`); vì vậy chưa thể coi 1-3 là mốc bắt buộc đầu tư. Thua không mất tài nguyên hay tướng, được thử lại. Đường cong độ khó và cảm giác chơi sau chuyển đổi thời gian thực chưa được người chơi đánh giá; quan sát một seed không phải kết luận cân bằng chung. *(chi tiết provisional)*

## Core loop
- Chọn ải đã mở → sắp đội → bắt đầu trận tự động 5v5.
- Thắng → nhận vàng, kinh nghiệm tướng, nguyên liệu tiến hóa → mở ải tiếp.
- Nâng cấp, tiến hóa → thử thách mới; mắc ải thì đánh lại ải cũ lấy tài nguyên. *(chi tiết guessed)*

**Leads:** Auto-battler: bố trí và tự chiến đấu thời gian thực. RPG: phát triển tướng, chiến dịch. Lựa chọn của bạn ưu tiên mặc định.

## Goal & fail state
Hoàn thành 2 chương × 5 ải. Thua khi cả đội bị hạ hoặc hết thời gian giao tranh (mặc định 90 giây, cấu hình được); giữ tiến trình và thử lại. *(quy mô, giới hạn guessed)*

## Features
- [x] Đội 5 anh hùng đấu 5 địch, bố trí xuất phát 2 trước / 3 sau; xem kỹ năng trước trận. Chọn thẻ để nâng cấp không đảo đội; đổi chỗ chỉ khi bật Xếp đội. *(bố trí guessed)*
- [x] Tự chiến thời gian thực, vị trí thực thay đổi; cận chiến áp sát, đánh xa giữ khoảng cách, tự chọn mục tiêu mới khi địch chết.
- [x] Đồng hồ đánh và hồi kỹ năng riêng từng tướng; windup trước tác động, đạn bay cho đánh xa, nhiều hành động chồng thời gian. Hồi chiêu gốc 3.6 giây, điều chỉnh theo tốc độ; không còn hàng đợi lượt chung.
- [x] Năm vai trò phối hợp; ít nhất ba loại địch có hành vi khác nhau. *(guessed)*
- [x] Map 2 chương × 5 ải mở tuần tự, thủ lĩnh cuối chương. *(quy mô guessed)*
- [x] Vàng + kinh nghiệm tăng cấp; nguyên liệu riêng tiến hóa một bậc tăng chỉ số và cải thiện kỹ năng (thin stand-in). *(công thức guessed)*
- [x] Thưởng lần đầu và đánh lại; lưu đội, tài nguyên, ải đã mở trong trình duyệt. *(guessed)*
- [x] Hoạt ảnh chờ, tấn công, trúng đòn, bị hạ; kết quả rõ ràng. Estrilda dùng trực tiếp sprite sheet đã chỉ định: idle lặp, attack/hit/skill một lần rồi về idle, death giữ khung cuối; bốn hàng skill luân phiên là biến thể hình ảnh cùng một kỹ năng. Đòn trúng không cắt ngang hình ảnh kỹ năng đang thi triển; chết hủy windup, không hồi sinh bằng hồi máu.
- [x] HUD thời gian và hồi chiêu thay nhãn vòng/lượt; tạm dừng đóng băng di chuyển, đạn và hoạt ảnh.

## Your systems
- 5 anh hùng đấu 5 quái chiến dịch · in the slice
- đội tự di chuyển, đánh và dùng kỹ năng thời gian thực · in the slice (thay yêu cầu lượt ban đầu theo quyết định mới)
- nâng cấp tướng bằng tài nguyên · thin stand-in *(guessed)*
- tiến hóa tướng · thin stand-in *(guessed)*
- map chiến dịch, độ khó tăng theo chương · in the slice

## Keep

## Avoid
- Không sao chép logo, giao diện hay các nhân vật AFK Arena khác. Ngoại lệ được bạn yêu cầu: sprite Mounted Lancer/Estrilda và Radiant Mage/Belinda cho prototype cục bộ; quyền phát hành công khai chưa xác minh.
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
