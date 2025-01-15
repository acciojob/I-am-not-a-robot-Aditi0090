//your code here
const imagesContainer = document.getElementById("images-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const para = document.getElementById("para");
const message = document.getElementById("h");

const images = ["img1", "img2", "img3", "img4", "img5"];
let clickedImages = [];
let identicalImage = null;

function initialize() {
  clickedImages = [];
  para.textContent = "";
  message.style.display = "block";
  resetButton.style.display = "none";
  verifyButton.style.display = "none";

  const shuffledImages = [...images, images[Math.floor(Math.random() * images.length)]].sort(() => Math.random() - 0.5);

  imagesContainer.innerHTML = "";
  shuffledImages.forEach((imageClass, index) => {
    const img = document.createElement("div");
    img.className = imageClass;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img));
    imagesContainer.appendChild(img);
  });
}

function handleImageClick(img) {
  if (clickedImages.length === 2 || clickedImages.includes(img.dataset.index)) {
    return;
  }

  clickedImages.push(img.dataset.index);
  img.classList.add("selected");

  if (clickedImages.length > 0) {
    resetButton.style.display = "block";
  }

  if (clickedImages.length === 2) {
    verifyButton.style.display = "block";
  }
}

function handleVerify() {
  const [first, second] = clickedImages;
  const firstClass = imagesContainer.children[first].className;
  const secondClass = imagesContainer.children[second].className;

  if (firstClass === secondClass) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyButton.style.display = "none";
}

resetButton.addEventListener("click", initialize);
verifyButton.addEventListener("click", handleVerify);

initialize();

