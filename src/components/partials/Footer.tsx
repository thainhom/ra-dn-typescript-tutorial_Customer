import "./Footer.css";
import { Link } from "react-router-dom";

function CustomerFooterComponent() {
  return (
    <div className="footer-card">
      <footer>
        <div className="footer">
          <div className="about">
            <div className="logo-set-small">
              <Link to="/">
                <h6>ThaiNhom.com</h6>
              </Link>
            </div>
            <section className="about-p">
              <p>
                Chúng tôi trang bị những sản phẩm tuyệt vời để phục vụ quý khách
                !
              </p>
            </section>
          </div>
          <div className="info">
            <h4>Liên kết</h4>
            <nav>
              <ul>
                <li>
                  <Link to="/products">Sản phẩm</Link>
                </li>
                <li>
                  <Link to="/aboutUs">Câu chuyện của chúng tôi</Link>
                </li>
                <li>
                  <Link to="/QnA">Các câu hỏi thường gặp</Link>
                </li>
                <li>
                  <Link to="/Admin">Truy cập quyền quản trị</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="contact">
            <h4>Liên hệ</h4>
            <ul className="link-list">
              <li>
                <Link to="/contact">Để lại lời nhắn</Link>
              </li>
              <li>
                <a href="https://www.facebook.com/le.quangthai.56/">
                  info@ThaiNhom.com
                </a>
              </li>
              <li>
                <a href="">www.ThaiNhom.com</a>
              </li>
              <li>
                <a href="">Da Nang City, Vietnam</a>
              </li>
              <li>
                <a href="">+084 905 602 739</a>
              </li>
            </ul>
          </div>
          <div className="social">
            <h4>Social</h4>
            <ul className="link">
              <li>
                <i className="fab fa-facebook-f"></i> 22.543 Likes
              </li>
              <li>
                <i className="fab fa-twitter"></i> 12.860 Followers
              </li>
              <li>
                <i className="fab fa-pinterest"></i> 3331 Pins
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CustomerFooterComponent;
