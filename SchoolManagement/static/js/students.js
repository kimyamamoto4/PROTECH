document.addEventListener("DOMContentLoaded", () => {
  const gradeSelect = document.getElementById("grade");
  const sectionSelect = document.getElementById("section");

  gradeSelect.addEventListener("change", () => {
      const selectedGrade = gradeSelect.value;

      // Show only sections matching the selected grade
      Array.from(sectionSelect.options).forEach(option => {
          const sectionGrade = option.getAttribute("data-grade");
          option.style.display = (sectionGrade === selectedGrade) ? "block" : "none";
      });

      // Reset section selection
      sectionSelect.value = "";
  });

  const saveButton = document.querySelector('.save-btn');
  const addStudentForm = document.getElementById('add-student-form');

  saveButton.addEventListener('click', () => {
      addStudentForm.submit(); // Submit the form
  });
});

function toggleProfileMenu() {
  const profileMenu = document.getElementById('profile-menu');
  profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// Close the profile menu when clicking outside
window.addEventListener('click', function (event) {
  const profileMenu = document.getElementById('profile-menu');
  const profilePic = document.querySelector('.profile-pic');
  if (profileMenu && profileMenu.style.display === 'block' && !profilePic.contains(event.target)) {
    profileMenu.style.display = 'none';
  }
});

// Open the Add Student Modal
function openAddStudentModal() {
    const modal = document.getElementById('add-student-modal');
    modal.style.display = 'flex'; // Show the modal

    // Start the camera feed
    startCamera();
}

// Close the Add Student Modal
function closeAddStudentModal() {
  const modal = document.getElementById('add-student-modal');
  modal.style.display = 'none'; // Hide the modal
  stopCamera(); // Stop the camera when the modal closes
}

// Close the modal when clicking outside of it
window.addEventListener('click', function (event) {
  const modal = document.getElementById('add-student-modal');
  if (event.target === modal) {
    closeAddStudentModal();
  }
});

function openCaptureModal() {
    const modal = document.getElementById('add-student-modal');
    const video = document.getElementById('camera-feed');

    // Display the modal
    modal.style.display = 'block';

    // Start the camera feed
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((error) => {
            console.error('Error accessing the camera:', error);
            alert('Unable to access the camera. Please check your device settings.');
        });
}

function captureImage() {
    const video = document.getElementById('camera-feed');
    const canvas = document.getElementById('photo-canvas');
    const capturedPhoto = document.getElementById('captured-photo');
    const captureBtn = document.querySelector('.capture-btn');
    const removeBtn = document.querySelector('.remove-btn');

    // Draw the video frame to the canvas
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL and set it as the image source
    const photoData = canvas.toDataURL('image/png');
    capturedPhoto.src = photoData;
    capturedPhoto.style.display = 'block';
    video.style.display = 'none';

    // Set the hidden input value to the captured photo data
    document.getElementById('photo').value = photoData;

    // Show the remove button and hide the capture button
    captureBtn.style.display = 'none';
    removeBtn.style.display = 'inline';
}

function removeCapturedImage() {
    const capturedPhoto = document.getElementById('captured-photo');
    const video = document.getElementById('camera-feed');
    const captureBtn = document.querySelector('.capture-btn');
    const removeBtn = document.querySelector('.remove-btn');

    // Hide the captured photo and show the video feed
    capturedPhoto.style.display = 'none';
    video.style.display = 'block';

    // Show the capture button and hide the remove button
    captureBtn.style.display = 'inline';
    removeBtn.style.display = 'none';

    // Clear the hidden input field
    document.getElementById('photo').value = '';
}
