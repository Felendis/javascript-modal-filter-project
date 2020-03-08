'use strict'

const ourStore = {
 storeItems: document.getElementsByClassName('store-item'),

 searchBarFilter (parameter) {
  for (let product of this.storeItems) {
   if (!product.dataset.item.includes(parameter) ) {
    product.hidden = true;
   };
  };
 },

 clickFilter (parameter) {
  if (parameter === ' all') {
   this.resetFilter();
  } else {
   for (let product of this.storeItems) {
    if (product.dataset.item !== parameter) {
     product.hidden = true;
    };
   };
  };
 },

 resetFilter () {
  for (let product of this.storeItems) {
   product.hidden = false;
  };
 },
};

const modalDisplay = {
 modalContainer: document.querySelector('.lightbox-container'),
 modalContainerImage: document.querySelector('.lightbox-item'),
 modalImageList: document.querySelectorAll('.store-img'),
 currentIndex: 0,

 displayModalStoreItem (indexNumber) {
  this.modalContainerImage.style.backgroundImage = `url(${this.modalImageList[indexNumber].src})`;
  this.modalContainer.classList.add("show");
  this.currentIndex = indexNumber;
 },

 slideLeft () {
  if (this.currentIndex !== 0) {
   while (ourStore.storeItems[this.currentIndex - 1].hidden === true) {
    this.currentIndex--;
   }
   this.displayModalStoreItem(this.currentIndex - 1);
  };
 },

 slideRight () {
  debugger;
  if (this.currentIndex !== this.modalImageList.length - 1) {
   while (ourStore.storeItems[this.currentIndex + 1].hidden === true) {
    this.currentIndex++;
   }
   this.displayModalStoreItem(this.currentIndex + 1);
  };
 },

 exitModalDisplay () {
  this.modalContainer.classList.remove("show");
 },

};

const handlers = {
 buttonEventListeners () {
  //get all buttons
  const allBtns = document.getElementsByClassName('filter-btn');
  //add event listener for filter function to each button
  for (let btn of allBtns) {
   btn.addEventListener('click', function (e) {
    e.preventDefault();
    ourStore.resetFilter();
    ourStore.clickFilter(btn.text);
   });
  };

  const allStoreItemBtns = document.getElementsByClassName('img-container');
  for (let i = 0; i < allStoreItemBtns.length; i++) {
   allStoreItemBtns[i].addEventListener('click', function () {
    modalDisplay.displayModalStoreItem(i);
   });
  };

  const btnClose = document.querySelector(".lightbox-close");
  btnClose.addEventListener('click', function () {
   modalDisplay.exitModalDisplay();
  });

  const btnLeft = document.querySelector(".btnLeft");
  btnLeft.addEventListener('click', function () {
   modalDisplay.slideLeft();
  });

  const btnRight = document.querySelector(".btnRight");
  btnRight.addEventListener('click', function () {
   modalDisplay.slideRight();
  });

 },

 searchBarEventListeners () {
  const searchBar = document.getElementById("search-item");
  searchBar.addEventListener('keyup', function (e) {
   ourStore.resetFilter();
   ourStore.searchBarFilter(document.getElementById("search-item").value);
  });
 },
};

handlers.buttonEventListeners();
handlers.searchBarEventListeners();
