document.addEventListener("DOMContentLoaded", () => {
    let video = document.getElementById('camera-feed');
    let canvas = document.getElementById('photo-canvas');
    let capturedPhoto = document.getElementById('captured-photo');
    let capturebutton = document.getElementById('captureBtn');
    let captureBtn = document.getElementById('capture-btn');
    let recaptureBtn = document.getElementById('recapture-btn');
    let saveBtn = document.getElementById('save-btn');
    let closeBtn = document.getElementById('close-modal-btn'); 
    let modal = document.getElementById('capture-photo-modal');
    let context = canvas.getContext('2d');
    let photoDataURL = '';
    let filename = '';

    // Open the Capture Photo Modal
    function openCaptureModal() {
        const modal = document.getElementById('add-student-modal');
        const video = document.getElementById('camera-feed');

        modal.style.display = 'block';

        // Start the camera feed
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((error) => {
                console.error('Error accessing the camera:', error);
            });
    }

    // Close the Capture Photo Modal
    function closeCaptureModal() {
        const modal = document.getElementById('add-student-modal');
        const video = document.getElementById('camera-feed');

        modal.style.display = 'none';

        // Stop the camera feed
        const stream = video.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
        video.srcObject = null;
    }

    // Start the Camera Feed
    function startCamera() {
        console.log('Attempting to start camera...');
        const video = document.getElementById('camera-feed'); // Ensure correct reference
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
                console.log('Camera feed started');
            })
            .catch(function(err) {
                console.error('Error accessing camera: ', err);
                alert('Unable to access camera. Please check permissions.');
            });
    }

    // Stop the Camera Feed
    function stopCamera() {
        const video = document.getElementById('camera-feed');
        if (video.srcObject) {
            const stream = video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
            console.log('Camera feed stopped');
        }
    }

    // Capture Image from Video Feed
    function captureImage() {
        const canvas = document.getElementById('photo-canvas');
        const video = document.getElementById('camera-feed');
        const photoInput = document.getElementById('photo');
        const capturedPhoto = document.getElementById('captured-photo');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoDataURL = canvas.toDataURL('image/png');
        photoInput.value = photoDataURL; // Store the photo as a Base64 string
        capturedPhoto.src = photoDataURL;
        capturedPhoto.style.display = 'block';
        video.style.display = 'none';
    }

    // Recapture Image
    function recaptureImage() {
        const video = document.getElementById('camera-feed');
        const capturedPhoto = document.getElementById('captured-photo');
        const captureBtn = document.querySelector('.capture-btn');
        const recaptureBtn = document.querySelector('.recapture-btn');

        // Hide the captured photo and show the video feed
        capturedPhoto.style.display = 'none';
        video.style.display = 'block';

        // Show the capture button and hide the recapture button
        captureBtn.style.display = 'inline';
        recaptureBtn.style.display = 'none';
    }

    // Save the Captured Image to a Temporary Folder (client-side)
    function saveImage() {
        const lrn = document.getElementById('student-lrn').value; // Get LRN from form

        if (photoDataURL) {
            filename = `${lrn}.jpg`;
            const file = dataURLtoFile(photoDataURL, filename);

            let formData = new FormData();
            formData.append('face_photo', file);
            formData.append('student_lrn', lrn);

            fetch('/school/upload-temp-photo/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Image uploaded successfully:', data);
                filename = data.file_path.split('/').pop(); // Ensure filename is set correctly
                console.log(`Filename set to: ${filename}`);
                closeCaptureModal();
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
        }
    }

    // Convert Data URL to File
    function dataURLtoFile(dataURL, filename) {
        let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new File([u8arr], filename, { type: mime });
    }

    // Get CSRF token from cookie
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Reset modal to its initial state when closed
    function resetModal() {
        capturedPhoto.style.display = 'none';
        video.style.display = 'block';
        captureBtn.style.display = 'inline';
        recaptureBtn.style.display = 'none';
        saveBtn.style.display = 'none';
        photoDataURL = '';
        filename = '';
    }

    // Event Listeners
    capturebutton.addEventListener('click', openCaptureModal);
    captureBtn.addEventListener('click', captureImage);
    recaptureBtn.addEventListener('click', recaptureImage);
    saveBtn.addEventListener('click', saveImage);
    closeBtn.addEventListener('click', closeCaptureModal);

    // Ensure clicking outside the modal also closes it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeCaptureModal();
        }
    });

    // Ensure the camera is stopped when navigating away from the page
    window.addEventListener('pagehide', function() {
        stopCamera();
    });

    // Start the camera feed
    const video = document.getElementById('camera-feed');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
            console.log('Camera feed started');
        })
        .catch(function(err) {
            console.error('Error accessing camera: ', err);
            alert('Unable to access camera. Please check permissions.');
        });
});
