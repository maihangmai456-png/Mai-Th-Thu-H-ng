import React, { useState } from 'react';
import { Search, BookOpen, Layers, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

export const TextbookSummaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<'all' | 'bai-3' | 'bai-4'>('all');

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Sách Giáo Khoa Công Nghệ 10</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Tóm Tắt & Tra Cứu Kiến Thức Trọng Tâm
          </h2>
          <p className="text-xs text-slate-500">
            Hệ thống hóa nội dung bài học Bài 3 & Bài 4 (Bộ sách Kết nối tri thức với cuộc sống)
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm công nghệ, thuật ngữ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setSelectedSection('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            selectedSection === 'all'
              ? 'bg-emerald-100 text-emerald-800'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tất cả chuyên đề
        </button>
        <button
          onClick={() => setSelectedSection('bai-3')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            selectedSection === 'bai-3'
              ? 'bg-blue-100 text-blue-800'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bài 3: Công nghệ phổ biến (Trang 14-22)
        </button>
        <button
          onClick={() => setSelectedSection('bai-4')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            selectedSection === 'bai-4'
              ? 'bg-purple-100 text-purple-800'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bài 4: Một số công nghệ mới (Trang 23-28)
        </button>
      </div>

      {/* Content Outline */}
      <div className="space-y-6">
        {/* BÀI 3 */}
        {(selectedSection === 'all' || selectedSection === 'bai-3') && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 uppercase">
                  Bài 3
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">CÔNG NGHỆ PHỔ BIẾN</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Trang 14 - 22</span>
            </div>

            {/* I. Luyện kim, cơ khí */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-blue-900 bg-blue-50/70 p-2.5 rounded-lg">
                I. CÔNG NGHỆ TRONG LĨNH VỰC LUYỆN KIM, CƠ KHÍ
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* 1. Luyện kim */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">1. Công nghệ luyện kim (Trang 14-15)</span>
                  <p className="text-slate-600">
                    • Điều chế kim loại, hợp kim từ các loại quặng hoặc nguyên liệu khác.<br />
                    • <strong>Luyện kim đen:</strong> tạo ra gang và thép (sản xuất trong lò cao ở 1000°C - 2000°C).<br />
                    • <strong>Luyện kim màu:</strong> tạo ra nhôm, đồng, vàng, chì, kẽm,...<br />
                    • <strong>Kĩ sư luyện kim:</strong> thiết kế nhà máy, thiết bị, lập quy trình công nghệ và điều hành.
                  </p>
                </div>

                {/* 2. Đúc */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">2. Công nghệ đúc kim loại (Trang 15)</span>
                  <p className="text-slate-600">
                    • Nấu kim loại thành trạng thái lỏng, rót vào khuôn có hình dáng sản phẩm, sau khi đông đặc thu được vật đúc (chi tiết đúc hoặc phôi đúc).<br />
                    • <strong>Phân loại:</strong> đúc khuôn cát, khuôn kim loại, đúc ly tâm, đúc áp lực, đúc khuôn mẫu nóng chảy.<br />
                    • Ứng dụng: chi tiết phức tạp như thân máy công cụ, vỏ động cơ, cơ khí, mỹ thuật.
                  </p>
                </div>

                {/* 3. Gia công cắt gọt */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">3. Công nghệ gia công cắt gọt (Trang 16)</span>
                  <p className="text-slate-600">
                    • Lấy đi một phần kim loại của phôi dưới dạng <strong>phoi</strong> nhờ dao và máy cắt kim loại.<br />
                    • Độ chính xác và độ nhẵn bề mặt rất cao.<br />
                    • Gồm: tiện, phay, bào, mài,... gia công tia lửa điện, tia nước, laser.
                  </p>
                </div>

                {/* 4. Gia công áp lực */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">4. Công nghệ gia công áp lực (Trang 16-17)</span>
                  <p className="text-slate-600">
                    • Dựa vào <strong>tính dẻo</strong> của kim loại, dùng ngoại lực làm kim loại biến dạng.<br />
                    • <strong>Cán:</strong> qua 2 trục quay ngược chiều, chiều dày giảm, chiều dài tăng.<br />
                    • <strong>Kéo:</strong> kéo qua lỗ khuôn tạo thỏi/ống dài không hạn chế.<br />
                    • <strong>Rèn và dập:</strong> tạo phôi dùng trong xây dựng, cầu đường.
                  </p>
                </div>

                {/* 5. Công nghệ hàn */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 md:col-span-2">
                  <span className="font-bold text-slate-900 text-sm">5. Công nghệ hàn (Trang 17-18)</span>
                  <p className="text-slate-600 leading-relaxed">
                    • Nối kim loại thành một khối không thể tháo rời bằng nung nóng đến trạng thái chảy hoặc dẻo.<br />
                    • <strong>Hàn nóng chảy:</strong> nung chỗ hàn và que hàn đến nóng chảy hoàn toàn (hàn hồ quang que hàn, hàn MAG).<br />
                    • <strong>Hàn áp lực:</strong> nung đến trạng thái dẻo rồi dùng ngoại lực ép lại.<br />
                    • Ứng dụng: kết cấu nhà khung thép, cổng, cửa sắt, giàn giáo, đồ mỹ thuật.
                  </p>
                </div>
              </div>
            </div>

            {/* II. Điện - Điện tử */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-bold text-blue-900 bg-blue-50/70 p-2.5 rounded-lg">
                II. CÔNG NGHỆ TRONG LĨNH VỰC ĐIỆN - ĐIỆN TỬ
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">1. Sản xuất & truyền tải điện năng (Trang 19)</span>
                  <p className="text-slate-600">
                    • Biến đổi các năng lượng khác thành điện năng: thuỷ điện, điện hạt nhân/nguyên tử, điện gió, điện mặt trời, nhiệt điện.<br />
                    • Phân phối từ nhà máy đến nơi tiêu thụ qua hệ thống truyền tải và phân phối điện.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">2. Công nghệ điện - quang (Trang 20)</span>
                  <p className="text-slate-600">
                    • Biến đổi điện năng thành quang năng.<br />
                    • <strong>Đèn sợi đốt (1879):</strong> điện năng &rarr; nhiệt năng &rarr; quang năng.<br />
                    • <strong>Đèn phóng điện (1934):</strong> phóng điện tạo tia tử ngoại tác dụng vào bột huỳnh quang.<br />
                    • <strong>Đèn LED (2006):</strong> dòng 1 chiều qua diode chuyển trực tiếp thành ánh sáng.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">3. Công nghệ điện - cơ (Trang 20-21)</span>
                  <p className="text-slate-600">
                    • Biến đổi điện năng sang cơ năng.<br />
                    • <strong>Dạng quay:</strong> động cơ điện (quạt điện, máy xay xát, máy bơm nước...).<br />
                    • <strong>Dạng tịnh tiến:</strong> van điện từ, relay (rơle điều khiển điện áp cao bằng nguồn áp thấp - Joseph Henry 1835).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm">4. Tự động hoá & Truyền thông (Trang 21-22)</span>
                  <p className="text-slate-600">
                    • <strong>Điều khiển tự động hoá:</strong> thay thế thao tác con người bằng máy móc, robot; tăng năng suất, giảm nhân công, chi phí (dây chuyền lắp ráp ô tô).<br />
                    • <strong>Truyền thông không dây:</strong> truyền thông tin qua khoảng cách không dùng dây bằng sóng điện từ (Wi-Fi, Bluetooth, mạng di động).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BÀI 4 */}
        {(selectedSection === 'all' || selectedSection === 'bai-4') && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800 uppercase">
                  Bài 4
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">MỘT SỐ CÔNG NGHỆ MỚI</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Trang 23 - 28</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* 1. Nano */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm">1. Công nghệ Nano (Trang 23-24)</span>
                <p className="text-slate-600">
                  • Phân tích, chế tạo vật liệu có kích thước cấu trúc từ <strong>1 đến 100 nm</strong>.<br />
                  • <strong>Y học:</strong> hạn chế khối u phát triển, tiêu diệt tế bào ung thư ở cấp độ tế bào.<br />
                  • <strong>May mặc:</strong> hạt nano bạc trong sợi vải diệt khuẩn, khử mùi.
                </p>
              </div>

              {/* 2. CAD/CAM/CNC */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm">2. Công nghệ CAD/CAM/CNC (Trang 24-25)</span>
                <p className="text-slate-600">
                  • <strong>CAD:</strong> thiết kế mô hình chi tiết trên máy tính.<br />
                  • <strong>CAM:</strong> lập quy trình công nghệ gia công chi tiết trên máy tính.<br />
                  • <strong>CNC:</strong> điều khiển máy công cụ bằng chương trình số để gia công chi tiết thực.<br />
                  • Chuỗi liên hoàn: Ý tưởng chi tiết -&gt; CAD -&gt; CAM -&gt; CNC.
                </p>
              </div>

              {/* 3. In 3D */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm">3. Công nghệ in 3D (Trang 25-26)</span>
                <p className="text-slate-600">
                  • Phân tách mô hình 3D thành các lớp 2D xếp chồng lên nhau; kĩ thuật in <strong>đắp dần tuần tự</strong> từng lớp vật liệu.<br />
                  • Độ nhẵn bề mặt phụ thuộc vào độ dày các lớp.<br />
                  • Ứng dụng: xương khớp cấy ghép y học, thời trang, cơ khí, xây dựng, đồ mỹ thuật.
                </p>
              </div>

              {/* 4. Năng lượng tái tạo */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm">4. Công nghệ năng lượng tái tạo (Trang 26-27)</span>
                <p className="text-slate-600">
                  • Chuyển hoá từ các nguồn liên tục, vô hạn, ít tác động tiêu cực đến môi trường.<br />
                  • Gió, mặt trời, địa nhiệt, nước, sóng/thủy triều.<br />
                  • Ứng dụng sản xuất điện sạch, sưởi ấm, nước nóng.
                </p>
              </div>

              {/* 5. AI */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm">5. Trí tuệ nhân tạo (AI) (Trang 27)</span>
                <p className="text-slate-600">
                  • Mô phỏng hoạt động trí tuệ con người bằng máy móc/máy tính.<br />
                  • Tự động hoá hành vi thông minh (biết cảm xúc, tự phân tích, đánh giá).<br />
                  • Ứng dụng trong y tế, kinh doanh, giáo dục, robot. Kĩ sư AI tốt nghiệp ngành CNTT.
                </p>
              </div>

              {/* 6 & 7. IoT & Robot */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm">6. IoT & Robot thông minh (Trang 28)</span>
                <p className="text-slate-600">
                  • <strong>IoT (Internet vạn vật):</strong> kết nối trao đổi dữ liệu giữa máy móc và con người qua internet (Kevin Ashton đề xuất 1999).<br />
                  • <strong>Robot thông minh:</strong> có "bộ não" sử dụng AI, cải thiện khả năng nhận thức và ra quyết định linh hoạt.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
