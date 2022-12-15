const imageInput = document.querySelector("#image-input");
imageInput.addEventListener("change", function() { 
    const reader = new FileReader(); 
    reader.addEventListener("load", () => { 
        const uploadedImage = reader.result; 
        document.querySelector("#display-image").style.backgroundImage = `url(${uploadedImage})`; 
    }); 
    reader.readAsDataURL(this.files[0]); 
});