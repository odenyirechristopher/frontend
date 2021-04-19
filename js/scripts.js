// the jQuery wannabe :P
const $ = e => document.querySelector(e);
const sections = ['#home', '#pictures', '#projects', '#blog', '#about', '#contact'];
let currSec;

function inView(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight));

}

function onVisibilityChange(el) {
  let old_visible;
  let visible = inView(el);
  if (visible != old_visible) {
    old_visible = visible;
  }
  return visible;
}

// Toggle classes for when hamburger is pressed
$('.hamburger').addEventListener('click', e => {
  $('.hamburger').classList.toggle('open');
  $('.nav').classList.toggle('open');
  $('.links').classList.toggle('open');
  $('.circles').classList.toggle('open');
});

// Minimise navbar when a link is pressed
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();

    $('.hamburger').classList.remove('open');
    $('.nav').classList.remove('open');
    $('.links').classList.remove('open');
    $('.circles').classList.remove('open');

    // Allow for smooth scrolling
    $(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

  });
});

function toggleGlow() {
  sections.forEach(section => {
    $('li.' + section.substring(1)).classList.remove('glow');
    if (section.substring(1) === currSec.id) {
      $('li.' + currSec.id).classList.add('glow');
    }
  });
}

function actions() {
  sections.forEach(section => {
    if (onVisibilityChange($(section)))
      currSec = $(section);
  });

  toggleGlow();
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', () => actions());
  window.addEventListener('scroll', () => actions());
  window.addEventListener('load', () => actions());
} else if (window.attachEvent) {
  window.attachEvent('onDOMContentLoaded', () => actions());
  window.attachEvent('onload', () => actions());
  window.attachEvent('onscroll', () => actions());
}


var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();
