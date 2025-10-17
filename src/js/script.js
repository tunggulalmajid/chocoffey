$(function () {
  // Tangkap semua link di dalam navigasi
  const navLinks = $(".nav-list a");

  // Tambahkan event click
  navLinks.on("click", function () {
    navLinks.removeClass("active");
    $(this).addClass("active");
  });
});
