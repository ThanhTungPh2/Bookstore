export class Fetch {
  static async fetchGet(link) {
      try {
          const response = await fetch(link, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
                  // Các header khác nếu cần
              },
          });

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          return data;
      } catch (error) {
          // Xử lý lỗi ở đây
          console.error('There was a problem with the fetch operation:', error);
          throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm fetchGet nếu cần
      }
  }
}
