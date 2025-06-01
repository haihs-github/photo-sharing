import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Thay đổi import từ CSS thông thường sang SCSS Module
import styles from "./login.module.scss";

function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		login_name: "",
		password: "",
	})

	const handleChangeFormData = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form data submitted:", formData);
		try {
			const response = await axios.post("http://localhost:8081/api/admin/login",
				formData
			);
			console.log("Login successfull:", response.data);
			const { token } = response.data;
			localStorage.setItem("token", token); // lưu token vào localStorage
			navigate("/users"); // chuyển hướng về trang chính sau khi đăng nhập
		} catch (err) {
			setError("wrong username or password");
			console.error(err);
		}
	};

	return (
		// Sử dụng các lớp CSS từ đối tượng styles đã import
		<div className={styles["login-container"]}>
			<h2>LOGIN</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Login Name:</label>
					<input
						type="text"
						value={formData.login_name}
						onChange={handleChangeFormData}
						name="login_name"
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={formData.password}
						onChange={handleChangeFormData}
						name="password"
						required
					/>
				</div>
				{/* CSS Modules không áp dụng cho style inline, nhưng bạn có thể thêm class nếu muốn */}
				{error && <p className={styles.errorText}>{error}</p>}
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;