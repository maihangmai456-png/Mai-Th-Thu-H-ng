import React, { useState } from 'react';
import { Search, BookOpen, Layers, CheckCircle2, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';

export const TextbookSummaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<'all' | 'bai-3' | 'bai-4'>('all');

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-black text-sm uppercase tracking-wider mb-1">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span>Sách Giáo Khoa Công Nghệ 10</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Tóm Tắt & Tra Cứu Kiến Thức Trọng Tâm
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-medium">
            Hệ thống hóa nội dung bài học Bài 3 & Bài 4 (Bộ sách Kết nối tri thức với cuộc sống)
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
          <input
            type="text"
            placeholder="Tìm kiếm công nghệ, thuật ngữ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-sm sm:text-base font-medium border-2 border-indigo-200 rounded-2xl bg-amber-50/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 shadow-xs"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-indigo-200/70 pb-3">
        <button
          onClick={() => setSelectedSection('all')}
          className={`px-4 py-2 rounded-xl text-sm font-black transition-all cursor-pointer ${
            selectedSection === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
              : 'bg-indigo-100/70 text-indigo-950 hover:bg-indigo-200'
          }`}
        >
          Tất cả chuyên đề
        </button>
        <button
          onClick={() => setSelectedSection('bai-3')}
          className={`px-4 py-2 rounded-xl text-sm font-black transition-all cursor-pointer ${
            selectedSection === 'bai-3'
              ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md'
              : 'bg-indigo-100/70 text-indigo-950 hover:bg-indigo-200'
          }`}
        >
          Bài 3: Công nghệ phổ biến (Trang 14-22)
        </button>
        <button
          onClick={() => setSelectedSection('bai-4')}
          className={`px-4 py-2 rounded-xl text-sm font-black transition-all cursor-pointer ${
            selectedSection === 'bai-4'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
              : 'bg-indigo-100/70 text-indigo-950 hover:bg-indigo-200'
          }`}
        >
          Bài 4: Một số công nghệ mới (Trang 23-28)
        </button>
      </div>

      {/* Content Outline */}
      <div className="space-y-7">
        {/* BÀI 3 */}
        {(selectedSection === 'all' || selectedSection === 'bai-3') && (
          <div className="bg-gradient-to-br from-blue-50/90 via-sky-50/90 to-amber-50/90 rounded-3xl border-3 border-blue-200 p-6 sm:p-8 space-y-6 shadow-lg">
            <div className="flex items-center justify-between border-b-2 border-blue-200 pb-4">
              <div>
                <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-black bg-blue-600 text-white uppercase shadow-xs">
                  Bài 3
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-blue-950 mt-1.5">CÔNG NGHỆ PHỔ BIẾN</h3>
              </div>
              <span className="text-sm font-extrabold text-blue-800 bg-white/80 px-3 py-1 rounded-xl border border-blue-200">
                Trang 14 - 22 SGK
              </span>
            </div>

            {/* I. Luyện kim, cơ khí */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-black text-blue-950 bg-blue-200/70 p-3 rounded-2xl border border-blue-300">
                I. CÔNG NGHỆ TRONG LĨNH VỰC LUYỆN KIM, CƠ KHÍ
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                {/* 1. Luyện kim */}
                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">1. Công nghệ luyện kim (Trang 14-15)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • Điều chế kim loại, hợp kim từ các loại quặng hoặc nguyên liệu khác.<br />
                    • <strong className="text-blue-900 font-extrabold">Luyện kim đen:</strong> tạo ra gang và thép (sản xuất trong lò cao ở 1000°C - 2000°C).<br />
                    • <strong className="text-blue-900 font-extrabold">Luyện kim màu:</strong> tạo ra nhôm, đồng, vàng, chì, kẽm,...<br />
                    • <strong className="text-blue-900 font-extrabold">Kĩ sư luyện kim:</strong> thiết kế nhà máy, thiết bị, lập quy trình công nghệ và điều hành.
                  </p>
                </div>

                {/* 2. Đúc */}
                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">2. Công nghệ đúc kim loại (Trang 15)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • Nấu kim loại thành trạng thái lỏng, rót vào khuôn có hình dáng sản phẩm, sau khi đông đặc thu được vật đúc (chi tiết đúc hoặc phôi đúc).<br />
                    • <strong className="text-blue-900 font-extrabold">Phân loại:</strong> đúc khuôn cát, khuôn kim loại, đúc ly tâm, đúc áp lực, đúc khuôn mẫu nóng chảy.<br />
                    • <strong className="text-blue-900 font-extrabold">Ứng dụng:</strong> chi tiết phức tạp như thân máy công cụ, vỏ động cơ, cơ khí, mỹ thuật.
                  </p>
                </div>

                {/* 3. Gia công cắt gọt */}
                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">3. Công nghệ gia công cắt gọt (Trang 16)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • Lấy đi một phần kim loại của phôi dưới dạng <strong className="text-blue-900 font-extrabold">phoi</strong> nhờ dao và máy cắt kim loại.<br />
                    • Độ chính xác và độ nhẵn bề mặt rất cao.<br />
                    • Gồm: tiện, phay, bào, mài,... gia công tia lửa điện, tia nước, laser.
                  </p>
                </div>

                {/* 4. Gia công áp lực */}
                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">4. Công nghệ gia công áp lực (Trang 16-17)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • Dựa vào <strong className="text-blue-900 font-extrabold">tính dẻo</strong> của kim loại, dùng ngoại lực làm kim loại biến dạng.<br />
                    • <strong className="text-blue-900 font-extrabold">Cán:</strong> qua 2 trục quay ngược chiều, chiều dày giảm, chiều dài tăng.<br />
                    • <strong className="text-blue-900 font-extrabold">Kéo:</strong> kéo qua lỗ khuôn tạo thỏi/ống dài không hạn chế.<br />
                    • <strong className="text-blue-900 font-extrabold">Rèn và dập:</strong> tạo phôi dùng trong xây dựng, cầu đường.
                  </p>
                </div>

                {/* 5. Công nghệ hàn */}
                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 md:col-span-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">5. Công nghệ hàn (Trang 17-18)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • Nối kim loại thành một khối không thể tháo rời bằng nung nóng đến trạng thái chảy hoặc dẻo.<br />
                    • <strong className="text-blue-900 font-extrabold">Hàn nóng chảy:</strong> nung chỗ hàn và que hàn đến nóng chảy hoàn toàn (hàn hồ quang que hàn, hàn MAG).<br />
                    • <strong className="text-blue-900 font-extrabold">Hàn áp lực:</strong> nung đến trạng thái dẻo rồi dùng ngoại lực ép lại.<br />
                    • <strong className="text-blue-900 font-extrabold">Ứng dụng:</strong> kết cấu nhà khung thép, cổng, cửa sắt, giàn giáo, đồ mỹ thuật.
                  </p>
                </div>
              </div>
            </div>

            {/* II. Điện - Điện tử */}
            <div className="space-y-4 pt-2">
              <h4 className="text-base sm:text-lg font-black text-blue-950 bg-blue-200/70 p-3 rounded-2xl border border-blue-300">
                II. CÔNG NGHỆ TRONG LĨNH VỰC ĐIỆN - ĐIỆN TỬ
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">1. Sản xuất & truyền tải điện năng (Trang 19)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • Biến đổi các năng lượng khác thành điện năng: thuỷ điện, điện hạt nhân/nguyên tử, điện gió, điện mặt trời, nhiệt điện.<br />
                    • Phân phối từ nhà máy đến nơi tiêu thụ qua hệ thống truyền tải và phân phối điện.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">2. Công nghệ điện - quang (Trang 20)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • Biến đổi điện năng thành quang năng.<br />
                    • <strong className="text-blue-900 font-extrabold">Đèn sợi đốt (1879):</strong> điện năng &rarr; nhiệt năng &rarr; quang năng.<br />
                    • <strong className="text-blue-900 font-extrabold">Đèn phóng điện (1934):</strong> phóng điện tạo tia tử ngoại tác dụng vào bột huỳnh quang.<br />
                    • <strong className="text-blue-900 font-extrabold">Đèn LED (2006):</strong> dòng 1 chiều qua diode chuyển trực tiếp thành ánh sáng.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">3. Công nghệ điện - cơ (Trang 20-21)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • Biến đổi điện năng sang cơ năng.<br />
                    • <strong className="text-blue-900 font-extrabold">Dạng quay:</strong> động cơ điện (quạt điện, máy xay xát, máy bơm nước...).<br />
                    • <strong className="text-blue-900 font-extrabold">Dạng tịnh tiến:</strong> van điện từ, relay (rơle điều khiển điện áp cao bằng nguồn áp thấp - Joseph Henry 1835).
                  </p>
                </div>

                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-white/80 space-y-2 shadow-xs">
                  <span className="font-black text-blue-950 text-base sm:text-lg block">4. Tự động hoá & Truyền thông (Trang 21-22)</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    • <strong className="text-blue-900 font-extrabold">Điều khiển tự động hoá:</strong> thay thế thao tác con người bằng máy móc, robot; tăng năng suất, giảm chi phí.<br />
                    • <strong className="text-blue-900 font-extrabold">Truyền thông không dây:</strong> truyền thông tin qua khoảng cách không dùng dây bằng sóng điện từ (Wi-Fi, Bluetooth, mạng di động).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BÀI 4 */}
        {(selectedSection === 'all' || selectedSection === 'bai-4') && (
          <div className="bg-gradient-to-br from-purple-50/90 via-indigo-50/90 to-amber-50/90 rounded-3xl border-3 border-purple-200 p-6 sm:p-8 space-y-6 shadow-lg">
            <div className="flex items-center justify-between border-b-2 border-purple-200 pb-4">
              <div>
                <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-black bg-purple-700 text-white uppercase shadow-xs">
                  Bài 4
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-purple-950 mt-1.5">MỘT SỐ CÔNG NGHỆ MỚI</h3>
              </div>
              <span className="text-sm font-extrabold text-purple-800 bg-white/80 px-3 py-1 rounded-xl border border-purple-200">
                Trang 23 - 28 SGK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
              {/* 1. Nano */}
              <div className="p-4 rounded-2xl border-2 border-purple-200 bg-white/80 space-y-2 shadow-xs">
                <span className="font-black text-purple-950 text-base sm:text-lg block">1. Công nghệ Nano (Trang 23-24)</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  • Phân tích, chế tạo vật liệu có kích thước cấu trúc từ <strong className="text-purple-900 font-extrabold">1 đến 100 nm</strong>.<br />
                  • <strong className="text-purple-900 font-extrabold">Y học:</strong> hạn chế khối u phát triển, tiêu diệt tế bào ung thư ở cấp độ tế bào.<br />
                  • <strong className="text-purple-900 font-extrabold">May mặc:</strong> hạt nano bạc trong sợi vải diệt khuẩn, khử mùi.
                </p>
              </div>

              {/* 2. CAD/CAM/CNC */}
              <div className="p-4 rounded-2xl border-2 border-purple-200 bg-white/80 space-y-2 shadow-xs">
                <span className="font-black text-purple-950 text-base sm:text-lg block">2. Công nghệ CAD/CAM/CNC (Trang 24-25)</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  • <strong className="text-purple-900 font-extrabold">CAD:</strong> thiết kế mô hình chi tiết trên máy tính.<br />
                  • <strong className="text-purple-900 font-extrabold">CAM:</strong> lập quy trình công nghệ gia công chi tiết trên máy tính.<br />
                  • <strong className="text-purple-900 font-extrabold">CNC:</strong> điều khiển máy công cụ bằng chương trình số để gia công chi tiết thực.<br />
                  • Chuỗi liên hoàn: Ý tưởng chi tiết &rarr; CAD &rarr; CAM &rarr; CNC.
                </p>
              </div>

              {/* 3. In 3D */}
              <div className="p-4 rounded-2xl border-2 border-purple-200 bg-white/80 space-y-2 shadow-xs">
                <span className="font-black text-purple-950 text-base sm:text-lg block">3. Công nghệ in 3D (Trang 25-26)</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  • Phân tách mô hình 3D thành các lớp 2D xếp chồng lên nhau; kĩ thuật in <strong className="text-purple-900 font-extrabold">đắp dần tuần tự</strong> từng lớp vật liệu.<br />
                  • Độ nhẵn bề mặt phụ thuộc vào độ dày các lớp.<br />
                  • <strong className="text-purple-900 font-extrabold">Ứng dụng:</strong> xương khớp cấy ghép y học, thời trang, cơ khí, xây dựng, đồ mỹ thuật.
                </p>
              </div>

              {/* 4. Năng lượng tái tạo */}
              <div className="p-4 rounded-2xl border-2 border-purple-200 bg-white/80 space-y-2 shadow-xs">
                <span className="font-black text-purple-950 text-base sm:text-lg block">4. Công nghệ năng lượng tái tạo (Trang 26-27)</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  • Chuyển hoá từ các nguồn liên tục, vô hạn, ít tác động tiêu cực đến môi trường.<br />
                  • Gió, mặt trời, địa nhiệt, nước, sóng/thủy triều.<br />
                  • <strong className="text-purple-900 font-extrabold">Ứng dụng:</strong> sản xuất điện sạch, sưởi ấm, nước nóng.
                </p>
              </div>

              {/* 5. AI */}
              <div className="p-4 rounded-2xl border-2 border-purple-200 bg-white/80 space-y-2 shadow-xs">
                <span className="font-black text-purple-950 text-base sm:text-lg block">5. Trí tuệ nhân tạo (AI) (Trang 27)</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  • Mô phỏng hoạt động trí tuệ con người bằng máy móc/máy tính.<br />
                  • Tự động hoá hành vi thông minh (biết cảm xúc, tự phân tích, đánh giá).<br />
                  • <strong className="text-purple-900 font-extrabold">Ứng dụng:</strong> y tế, kinh doanh, giáo dục, robot. Kĩ sư AI tốt nghiệp ngành CNTT.
                </p>
              </div>

              {/* 6 & 7. IoT & Robot */}
              <div className="p-4 rounded-2xl border-2 border-purple-200 bg-white/80 space-y-2 shadow-xs">
                <span className="font-black text-purple-950 text-base sm:text-lg block">6. IoT & Robot thông minh (Trang 28)</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  • <strong className="text-purple-900 font-extrabold">IoT (Internet vạn vật):</strong> kết nối trao đổi dữ liệu giữa máy móc và con người qua internet (Kevin Ashton đề xuất 1999).<br />
                  • <strong className="text-purple-900 font-extrabold">Robot thông minh:</strong> có "bộ não" sử dụng AI, cải thiện khả năng nhận thức và ra quyết định linh hoạt.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
