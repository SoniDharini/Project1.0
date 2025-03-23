function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function(){
        document.getElementById('profile-image').src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
   