import { useState, useCallback } from 'react';
import {
	Box,
	Typography,
	Button,
	Paper,
	IconButton,
} from '@mui/material';
import axios from 'axios';

function Upload() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false); // Trạng thái đang upload lên server
	const [error, setError] = useState('');

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			handleFile(file);
		} else {
			resetState();
		}
	};

	const handleFile = useCallback((file) => {
		setError(''); // Reset lỗi khi chọn file mới

		const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
		if (!allowedTypes.includes(file.type)) {
			setError('Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WebP).');
			setSelectedFile(null);
			return;
		}
		setSelectedFile(file);
	}, []);

	const handleRemoveFile = () => {
		resetState();
	};

	// Hàm reset tất cả các trạng thái
	const resetState = () => {
		setSelectedFile(null);
		setIsUploading(false);
		setError('');
		const inputElement = document.getElementById('upload-button-only');
		if (inputElement) {
			inputElement.value = '';
		}
	};

	// HÀM: Gửi ảnh đến API
	const handleUploadToApi = async () => {
		if (!selectedFile) {
			setError('Vui lòng chọn một ảnh để tải lên.');
			return;
		}

		setIsUploading(true); // Bắt đầu trạng thái upload lên server
		setError(''); // Xóa lỗi cũ

		const formData = new FormData();
		formData.append('photo', selectedFile); // Tên 'photo' phải khớp với backend

		const token = localStorage.getItem('token'); // Lấy token

		try {
			const response = await axios.post(
				"http://localhost:8081/api/photo/new", // API endpoint của bạn
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': `Bearer ${token}`,
					},
				}
			);

			console.log('Upload thành công:', response.data);
			setSelectedFile(null); // Xóa file đã chọn sau khi upload thành công
			alert('Ảnh đã được tải lên thành công!'); // Thông báo đơn giản

		} catch (err) {
			console.error('Lỗi tải lên:', err.response?.data || err);
			setError(err.response?.data?.message || 'Không thể tải ảnh lên.');

		} finally {
			setIsUploading(false); // Kết thúc trạng thái upload
		}
	};

	return (
		<Paper
			elevation={3}
			sx={{
				padding: 4,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				border: `2px dashed #ccc`, // Border cố định
				borderRadius: '8px',
				minHeight: '150px', // Chiều cao tối thiểu
				textAlign: 'center',
				position: 'relative',
				backgroundColor: '#fff',
			}}
		>
			{selectedFile ? (
				<Box sx={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography variant="h6" gutterBottom>
						Ảnh đã chọn:
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						{selectedFile.name}
					</Typography>

					{/* Nút Upload và Nút Xóa */}
					<Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
						<Button
							variant="contained"
							onClick={handleUploadToApi}
							disabled={isUploading}
						>
							{isUploading ? 'Đang tải...' : 'Tải lên ngay'}
						</Button>
						<Button
							variant="outlined"
							color="error"
							onClick={handleRemoveFile}
							disabled={isUploading}
						>
							Xóa
						</Button>
					</Box>

					{/* Nút xóa file (trên góc) */}
					<IconButton
						aria-label="remove file"
						onClick={handleRemoveFile}
						sx={{
							position: 'absolute',
							top: -15,
							right: -15,
							color: 'error.main',
							bgcolor: 'background.paper',
							'&:hover': { bgcolor: 'background.default' },
							fontSize: '1rem',
						}}
						disabled={isUploading}
					>
						✖
					</IconButton>
				</Box>
			) : (
				<>
					{/* Không còn icon mũi tên lên */}
					<Typography variant="body1" color="text.secondary" gutterBottom>
						Chưa có ảnh nào được chọn.
					</Typography>
					<input
						accept="image/*"
						style={{ display: 'none' }}
						id="upload-button-only"
						type="file"
						onChange={handleFileChange}
					/>
					<label htmlFor="upload-button-only">
						<Button variant="contained" component="span">
							Chọn ảnh
						</Button>
					</label>
				</>
			)}
			{error && (
				<Typography color="error" variant="body2" sx={{ mt: 2 }}>
					{error}
				</Typography>
			)}
		</Paper>
	);
}

export default Upload;