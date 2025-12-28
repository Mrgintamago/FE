import React from "react";

const ProductParameters = ({ data }) => {
  return (
    <div className="product-parameters px-5 pb-10">
      <div className="text-2xl font-semibold mb-8">Thông tin chi tiết</div>
      <table className="table-product">
        <thead>
          <tr>
            <td>Thương hiệu</td>
            <td>{data?.brand?.name}</td>
          </tr>
          <tr>
            <td>Bảo hành</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Màu sắc</td>
            <td>{data?.color}</td>
          </tr>
          <tr>
            <td>Tỷ lệ (Scale)</td>
            <td>{data?.scale || "N/A"}</td>
          </tr>
          <tr>
            <td>Series/Anime</td>
            <td>{data?.series || "N/A"}</td>
          </tr>
          <tr>
            <td>Nhân vật</td>
            <td>{data?.character || "N/A"}</td>
          </tr>
          <tr>
            <td>Nhà sản xuất</td>
            <td>{data?.manufacturer || "N/A"}</td>
          </tr>
          <tr>
            <td>Chất liệu</td>
            <td>{data?.material || "N/A"}</td>
          </tr>
          <tr>
            <td>Chiều cao</td>
            <td>{data?.height ? `${data.height} cm` : "N/A"}</td>
          </tr>
          <tr>
            <td>Loại figure</td>
            <td>{data?.type || "N/A"}</td>
          </tr>
          <tr>
            <td>Ngày phát hành</td>
            <td>{data?.releaseDate || "N/A"}</td>
          </tr>
          <tr>
            <td>Khối lượng</td>
            <td>{data?.weight ? `${data.weight} kg` : "N/A"}</td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ProductParameters;
