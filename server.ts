import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client as instructed
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const TEXTBOOK_CONTEXT = `
NỘI DUNG SÁCH GIÁO KHOA CÔNG NGHỆ 10 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG:

BÀI 3: CÔNG NGHỆ PHỔ BIẾN
I. Công nghệ trong lĩnh vực luyện kim, cơ khí:
1. Công nghệ luyện kim:
- Khái niệm: Điều chế kim loại, hợp kim để dùng trong cuộc sống từ các loại quặng hoặc các nguyên liệu khác.
- Sản phẩm: Kim loại đen hoặc kim loại màu ở dạng thô (nguyên liệu cho công nghệ chế tạo vật liệu khác).
- Phân loại:
  + Công nghệ luyện kim đen: Tạo ra gang và thép (sản xuất trong lò cao ở nhiệt độ từ 1000°C - 2000°C).
  + Công nghệ luyện kim màu: Tạo ra nhôm, đồng, vàng, chì, kẽm,...
- Kĩ sư luyện kim: Thiết kế nhà máy, thiết bị luyện kim, lập quy trình công nghệ và điều hành sản xuất kim loại, hợp kim.

2. Công nghệ đúc kim loại:
- Khái niệm: Chế tạo sản phẩm kim loại bằng phương pháp nấu kim loại thành trạng thái lỏng, sau đó rót vào khuôn có hình dạng và kích thước như sản phẩm. Sau khi kim loại đông đặc, ta thu được sản phẩm là vật đúc có hình dạng và kích thước phù hợp với yêu cầu.
- Sản phẩm: Rất đa dạng, có thể sử dụng ngay (chi tiết đúc) hoặc qua gia công cơ khí (phôi đúc). Ứng dụng: chi tiết phức tạp như thân máy công cụ, vỏ động cơ,... chế tạo cơ khí, trang trí, mỹ thuật.
- Phân loại: Đúc trong khuôn cát, đúc trong khuôn kim loại, đúc ly tâm, đúc áp lực, đúc khuôn mẫu nóng chảy,...
- Nghề nghiệp: Kĩ thuật viên đúc, pha chế mẫu, khuôn và vận hành thiết bị phân xưởng đúc.

3. Công nghệ gia công cắt gọt:
- Khái niệm: Thực hiện việc lấy đi một phần kim loại của phôi dưới dạng phoi nhờ các dụng cụ cắt và máy cắt kim loại để tạo ra chi tiết có hình dạng, kích thước theo yêu cầu.
- Đặc điểm sản phẩm: Có độ chính xác và độ nhẵn bề mặt cao. Ứng dụng: các chi tiết máy trong cơ khí, nông nghiệp, lâm nghiệp, thuỷ sản,...
- Các công nghệ: Tiện, phay, bào, mài,... gia công bằng tia lửa điện, bằng tia nước, bằng laser,...

4. Công nghệ gia công áp lực:
- Khái niệm: Dựa vào tính dẻo của kim loại, dùng ngoại lực của thiết bị làm cho kim loại biến dạng theo hình dáng yêu cầu. Thường dùng trong các xưởng cơ khí để chế tạo phôi.
- Sản phẩm: Dùng nhiều trong ngành xây dựng, cầu đường, hàng tiêu dùng,...
- Các công nghệ: Cán, kéo, rèn và dập.
  + Cán: Cho phôi đi qua khe hở giữa hai trục cán quay ngược chiều nhau, làm cho phôi bị biến dạng, kết quả là chiều dày phôi giảm xuống, chiều dài tăng lên.
  + Kéo: Kéo dài phôi qua lỗ khuôn, dùng để chế tạo các sản phẩm dạng thỏi hoặc ống có chiều dài không hạn chế.
  + Rèn, dập: Tạo hình nhờ lực búa hoặc khuôn dập.

5. Công nghệ hàn:
- Khái niệm: Nối các chi tiết bằng kim loại với nhau thành một khối không thể tháo rời bằng cách nung nóng chỗ nối đến trạng thái hàn (chảy hoặc dẻo). Sau đó kim loại lỏng hoá rắn hoặc kim loại dẻo hoá rắn thông qua lực ép.
- Sản phẩm: Đồ gia dụng (cổng, cửa sắt, giàn giáo, bàn ghế), xây dựng (kết cấu nhà khung thép, nhà máy), sản xuất sản phẩm mỹ thuật.
- Phân loại theo trạng thái nhiệt mối hàn:
  + Hàn nóng chảy: Chỗ hàn và que hàn bổ sung được nung đến trạng thái nóng chảy (ví dụ: hàn hồ quang, hàn MAG - Metal Active Gas hàn hồ quang kim loại trong môi trường khí bảo vệ hoạt hoá).
  + Hàn áp lực: Chỗ nối được nung nóng đến trạng thái dẻo thì dùng ngoại lực ép lại, sau khi ép tạo nên mối hàn bền vững.

II. Công nghệ trong lĩnh vực điện - điện tử:
1. Công nghệ sản xuất điện năng:
- Khái niệm: Biến đổi các năng lượng khác thành điện năng.
- Nguồn năng lượng: Năng lượng nước (thuỷ điện), năng lượng nguyên tử (điện hạt nhân), năng lượng gió (điện gió), năng lượng mặt trời (điện mặt trời), năng lượng nhiệt (nhiệt điện)...
- Truyền tải và phân phối: Điện năng từ nhà máy được phân phối đến nơi tiêu thụ qua hệ thống truyền tải và phân phối điện năng.

2. Công nghệ điện - quang:
- Khái niệm: Biến đổi điện năng thành quang năng.
- Ba loại đèn chiếu sáng tiêu biểu:
  + Đèn sợi đốt: Dòng điện đi qua sợi đốt chuyển điện năng thành nhiệt năng, sau đó nhiệt năng chuyển hoá thành quang năng (phát minh 1879).
  + Đèn phóng điện: Khi điện áp đặt vào hai điện cực, sự phóng điện xảy ra tạo ra tia tử ngoại tác dụng vào lớp bột huỳnh quang phủ trong ống thuỷ tinh phát ra ánh sáng (năm 1934).
  + Đèn LED (Light Emitting Diode): Dựa trên nguyên lí chuyển từ điện năng thành quang năng khi cho dòng điện một chiều chạy qua diode (bước đột phá lớn năm 2006).

3. Công nghệ điện - cơ:
- Khái niệm: Biến đổi năng lượng điện sang cơ năng.
- Phân loại theo dạng chuyển động đầu ra:
  + Dạng quay: Động cơ điện đặc trưng quay (quạt điện, máy xay xát, máy hút bụi, máy bơm nước, động cơ dẫn động...).
  + Dạng tịnh tiến: Van điện từ, relay (rơle - công tắc điện sử dụng nguồn điện áp thấp điều khiển mạch điện áp cao, sáng chế năm 1835 bởi Joseph Henry).

4. Công nghệ điều khiển và tự động hoá:
- Khái niệm: Thiết kế, xây dựng, vận hành các hệ thống điều khiển nhằm mục đích tự động hoá các quá trình sản xuất tại các nhà máy, xí nghiệp.
- Đặc điểm: Thay thế thao tác của con người bằng các hoạt động của máy móc, robot tự động; tăng năng suất lao động, giảm thiểu nhân công, thời gian và chi phí.
- Ví dụ: Dây chuyền tự động hoá lắp ráp ô tô.

5. Công nghệ truyền thông không dây:
- Khái niệm: Cho phép truyền tải thông tin qua một khoảng cách mà không cần dây dẫn làm môi trường truyền. Sử dụng sóng điện từ trong không gian trên băng tần xác định ở mỗi kênh.
- Phân loại: Wi-Fi, Bluetooth, công nghệ mạng di động (3G, 4G, 5G...).

---------------------------------------------------------
BÀI 4: MỘT SỐ CÔNG NGHỆ MỚI
I. Khái quát về công nghệ mới:
- Là những công nghệ có giải pháp kĩ thuật phát triển hơn so với công nghệ hiện tại ở một lĩnh vực trong cuộc sống hoặc trong sản xuất.
- Bao gồm: công nghệ vật liệu nano, CAD/CAM/CNC, in 3D, năng lượng tái tạo, trí tuệ nhân tạo (AI), IoT, robot thông minh,...

II. Một số công nghệ mới:
1. Công nghệ nano:
- Khái niệm: Phân tích, chế tạo và ứng dụng các vật liệu có cấu trúc nano (thường có kích thước từ 1 đến 100 nanômét - nm).
- Ứng dụng: Cơ khí, điện tử, may mặc, thực phẩm, dược phẩm và y tế.
  + Trong y học: Phát triển ứng dụng để điều trị nhiều loại bệnh ung thư bằng cách hạn chế khối u phát triển và tiêu diệt chúng ở cấp độ tế bào.
  + Trong may mặc: Đưa các hạt nano bạc vào sợi vải, có khả năng thu hút và tiêu diệt các vi khuẩn trong quần áo (kháng khuẩn, khử mùi).

2. Công nghệ CAD/CAM/CNC:
- Khái niệm: 
  + CAD (Computer Aided Design): Sử dụng phần mềm CAD để thiết kế chi tiết (tạo ra mô hình thiết kế trên máy tính, bản vẽ kích thước, yêu cầu kĩ thuật).
  + CAM (Computer Aided Manufacturing): Lập quy trình công nghệ gia công chi tiết trên máy tính từ mô hình CAD.
  + CNC (Computer Numerical Control): Điều khiển số máy công cụ bằng chương trình của quá trình CAM để gia công chi tiết thực.
- Quy trình liên hoàn: Ý tưởng cho chi tiết -> CAD (Mô hình thiết kế) -> CAM (Quy trình công nghệ) -> CNC (Chi tiết thực).
- Ứng dụng: Chi tiết máy, sản phẩm y tế, khuôn mẫu ép vỏ điện thoại,...

3. Công nghệ in 3D:
- Khái niệm: Phân tách mô hình 3D thành các lớp 2D xếp chồng lên nhau. Sử dụng kĩ thuật in đắp dần từ mô hình thiết kế, các lớp vật liệu sẽ được đắp chồng lên nhau một cách tuần tự.
- Đặc điểm: Độ nhẵn bề mặt của sản phẩm phụ thuộc vào độ dày các lớp đắp.
- Ứng dụng: Lĩnh vực thiết kế thời trang, y học (xương nhân tạo, khớp nhân tạo, bộ phận cấy ghép), cơ khí, thực phẩm, xây dựng, đồ mỹ thuật,...

4. Công nghệ năng lượng tái tạo:
- Khái niệm: Sản xuất năng lượng trên cơ sở chuyển hoá từ các nguồn năng lượng liên tục, vô hạn, ít tác động tiêu cực đến môi trường.
- Các nguồn: Năng lượng gió, năng lượng mặt trời, năng lượng địa nhiệt, năng lượng nước, năng lượng sóng/thủy triều,...
- Ứng dụng: Sản xuất điện, sưởi ấm (địa nhiệt), tạo nước nóng,...

5. Công nghệ trí tuệ nhân tạo (AI - Artificial Intelligence):
- Khái niệm: Công nghệ mô phỏng các hoạt động trí tuệ của con người bằng máy móc, đặc biệt là các hệ thống máy tính.
- Sản phẩm: Phần mềm máy tính có thể tự động hoá các hành vi thông minh như con người (biết cảm xúc, biết tự phân tích và đánh giá...).
- Ứng dụng: Y tế, kinh doanh, giáo dục, sản xuất,...
- Nghề nghiệp: Kĩ sư trí tuệ nhân tạo phát triển ứng dụng thông minh, hệ thống tự động hoá, robot, lập trình dữ liệu,...

6. Công nghệ Internet vạn vật (IoT - Internet of Things):
- Khái niệm: Kết nối, thu thập và trao đổi dữ liệu với nhau giữa các máy tính, máy móc, thiết bị kĩ thuật số và cả con người thông qua môi trường internet.
- Cơ chế: Thiết bị trở nên thông minh hơn nhờ khả năng gửi hoặc nhận thông tin và tự động hoạt động dựa trên các thông tin đó.
- Lịch sử: Nhà khoa học người Anh Kevin Ashton là người lần đầu tiên đề cập đến khái niệm IoT vào năm 1999.
- Ứng dụng: Y tế (theo dõi bệnh nhân), công nghiệp, tài chính, nhà thông minh (Smart Home), nông nghiệp thông minh,...

7. Công nghệ Robot thông minh:
- Khái niệm: Robot có "bộ não" sử dụng trí tuệ nhân tạo, được cải thiện về khả năng "nhận thức", ra quyết định và thực thi nhiệm vụ theo cách toàn diện hơn so với robot truyền thống.
- Ứng dụng: Y tế, giáo dục, quân sự, giải trí, trong sản xuất,...
`;

app.post('/api/generate-quiz', async (req, res) => {
  try {
    const {
      lessonId = 'all',
      level = 'tong_hop',
      numQuestions = 10,
      customNote = '',
    } = req.body;

    const count = Math.min(Math.max(parseInt(numQuestions, 10) || 10, 1), 30);

    let lessonScope = '';
    if (lessonId === 'bai-3') {
      lessonScope = 'Chỉ tập trung vào BÀI 3: CÔNG NGHỆ PHỔ BIẾN (Luyện kim, đúc, cắt gọt, áp lực, hàn, sản xuất điện, điện-quang, điện-cơ, điều khiển tự động hoá, truyền thông không dây).';
    } else if (lessonId === 'bai-4') {
      lessonScope = 'Chỉ tập trung vào BÀI 4: MỘT SỐ CÔNG NGHỆ MỚI (Công nghệ nano, CAD/CAM/CNC, In 3D, Năng lượng tái tạo, Trí tuệ nhân tạo AI, Internet vạn vật IoT, Robot thông minh).';
    } else {
      lessonScope = 'Bao quát CẢ 2 BÀI: BÀI 3 VÀ BÀI 4 (Công nghệ phổ biến và Một số công nghệ mới) theo tỉ lệ cân đối.';
    }

    let levelInstruction = '';
    if (level === 'nhan_biet') {
      levelInstruction = '100% các câu hỏi ở CẤP ĐỘ NHẬN BIẾT: Hỏi về định nghĩa, thuật ngữ, từ viết tắt, phân loại, tên gọi thiết bị, thông số cụ thể (ví dụ 1-100nm, năm 1999, Kevin Ashton, Joseph Henry 1835...).';
    } else if (level === 'thong_hieu') {
      levelInstruction = '100% các câu hỏi ở CẤP ĐỘ THÔNG HIỂU: Hỏi về nguyên lý hoạt động, bản chất quá trình, so sánh phân biệt (ví dụ hàn nóng chảy vs hàn áp lực, chuyển động quay vs tịnh tiến, CAD khác CAM và CNC thế nào, nguyên lý đắp lớp in 3D...).';
    } else if (level === 'van_dung') {
      levelInstruction = '100% các câu hỏi ở CẤP ĐỘ VẬN DỤNG: Đưa ra tình huống thực tế đời sống, sản xuất, chế tạo hoặc gia đình. Học sinh cần vận dụng kiến thức bài học để lựa chọn giải pháp công nghệ, giải thích ứng dụng phù hợp (ví dụ làm cổng sắt mỹ thuật, diệt khuẩn khẩu trang vải bằng nano bạc, lắp đặt điện gió mặt trời, làm vỏ khuôn điện thoại...).';
    } else {
      levelInstruction = `TỔNG HỢP CẢ 3 CẤP ĐỘ theo ma trận đề thi chuẩn:
- Khoảng 40% câu hỏi Cấp độ 1: Nhận biết (nhan_biet)
- Khoảng 40% câu hỏi Cấp độ 2: Thông hiểu (thong_hieu)
- Khoảng 20% câu hỏi Cấp độ 3: Vận dụng (van_dung)`;
    }

    const prompt = `
Bạn là chuyên gia khảo thí và biên soạn đề kiểm tra Công nghệ 10 (Bộ sách Kết nối tri thức với cuộc sống).
Hãy tạo chính xác ${count} câu hỏi trắc nghiệm ôn tập cho học sinh dựa trên tài liệu chuẩn sách giáo khoa dưới đây.

YÊU CẦU ĐỀ BÀI:
1. Phạm vi bài học: ${lessonScope}
2. Cấp độ nhận thức: ${levelInstruction}
${customNote ? `3. Yêu cầu bổ sung của giáo viên: ${customNote}` : ''}

TIÊU CHUẨN CÂU HỎI:
- Mỗi câu hỏi có đúng 4 phương án lựa chọn: A, B, C, D (được lưu trong mảng 'options' theo thứ tự 0, 1, 2, 3).
- Chỉ có DUY NHẤT 1 đáp án đúng chính xác.
- Các phương án nhiễu phải hợp lý, không vô nghĩa.
- Phần giải thích (explanation) phải viết súc tích, sư phạm, dẫn chứng rõ ràng từ nội dung sách giáo khoa để học sinh hiểu sâu bản chất.
- Trường textbookReference nêu rõ mục bài học tương ứng (ví dụ: "Bài 3, Mục I.2 - Công nghệ đúc kim loại" hoặc "Bài 4, Mục II.1 - Công nghệ nano").

TÀI LIỆU SÁCH GIÁO KHOA THAM KHẢO:
${TEXTBOOK_CONTEXT}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'Danh sách các câu hỏi trắc nghiệm ôn tập',
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: 'Mã câu hỏi (vd: q1, q2...)' },
              lessonId: { type: Type.STRING, description: 'Mã bài học: bai-3 hoặc bai-4' },
              lessonTitle: { type: Type.STRING, description: 'Tên bài học' },
              level: { type: Type.STRING, description: 'nhan_biet, thong_hieu, hoặc van_dung' },
              levelLabel: { type: Type.STRING, description: 'Nhận biết, Thông hiểu, hoặc Vận dụng' },
              question: { type: Type.STRING, description: 'Nội dung câu hỏi' },
              options: {
                type: Type.ARRAY,
                description: 'Danh sách 4 phương án A, B, C, D',
                items: { type: Type.STRING },
              },
              correctAnswer: { type: Type.INTEGER, description: 'Chỉ số phương án đúng từ 0 đến 3 (0=A, 1=B, 2=C, 3=D)' },
              explanation: { type: Type.STRING, description: 'Giải thích chi tiết vì sao đáp án đúng' },
              textbookReference: { type: Type.STRING, description: 'Trích dẫn mục sách giáo khoa' },
            },
            required: [
              'id',
              'lessonId',
              'lessonTitle',
              'level',
              'levelLabel',
              'question',
              'options',
              'correctAnswer',
              'explanation',
              'textbookReference',
            ],
          },
        },
      },
    });

    const questions = JSON.parse(response.text?.trim() || '[]');
    res.json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error: any) {
    console.error('Error generating quiz:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Không thể tạo câu hỏi từ Gemini lúc này',
    });
  }
});

// Serve frontend in production or integrate with Vite in dev
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduQuiz server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
