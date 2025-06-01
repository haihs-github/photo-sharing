import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Thay đổi import từ CSS thông thường sang SCSS Module
import styles from "./Register.module.scss";

function Register() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		login_name: "",
		password: "",
		confirmPassword: "",
		first_name: "",
		last_name: "",
		location: "",
		description: "",
		occupation: ""
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
			const response = await axios.post("http://localhost:8081/api/user/",
				formData
			);
			console.log("Register successfull:", response.data);
			navigate("/login"); // chuyển hướng về trang chính sau khi đăng nhập
		} catch (err) {
			setError("error when register");
			console.error(err);
		}
	};

	return (
		// Sử dụng các lớp CSS từ đối tượng styles đã import
		<div className={styles["login-container"]}>
			<h2>REGISTER</h2>
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
				<div>
					<label>Confirm password:</label>
					<input
						type="password"
						value={formData.confirmPassword}
						onChange={handleChangeFormData}
						name="confirmPassword"
						required
					/>
				</div>
				<div>
					<label>First_name:</label>
					<input
						type="text"
						value={formData.first_name}
						onChange={handleChangeFormData}
						name="first_name"
						required
					/>
				</div>
				<div>
					<label>Last_name:</label>
					<input
						type="text"
						value={formData.last_name}
						onChange={handleChangeFormData}
						name="last_name"
						required
					/>
				</div>
				<div>
					<label>location:</label>
					<input
						type="text"
						value={formData.location}
						onChange={handleChangeFormData}
						name="location"
					/>
				</div>
				<div>
					<label>description:</label>
					<input
						type="text"
						value={formData.description}
						onChange={handleChangeFormData}
						name="description"
					/>
				</div>
				<div>
					<label>occupation:</label>
					<input
						type="text"
						value={formData.occupation}
						onChange={handleChangeFormData}
						name="occupation"
					/>
				</div>
				{error && <p className={styles.errorText}>{error}</p>}
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default Register;