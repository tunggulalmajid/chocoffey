$(function () {
  // Tangkap semua link di dalam navigasi
  const navLinks = $(".nav-list a");

  // Tambahkan event click
  navLinks.on("click", function () {
    navLinks.removeClass("active");
    $(this).addClass("active");
  });
});

$(function () {
  // 1. Dengarkan event 'submit' pada form dengan ID '#form-order'
  $("#form-order").on("submit", function (e) {
    // 2. Mencegah form terkirim secara normal
    e.preventDefault();

    // 3. Ambil nilai (value) dari input
    const nama = $("#nama");
    const sebuahorder = $("#order-text"); // ID diubah dari #message menjadi #order
    const nomorHp = "+6283856842965"; // Nomor WA Tujuan

    // 4. Susun pesan WA-nya
    //    Kita ganti string pesannya agar sesuai dengan konteks "Order"
    const pesanKirim = `halo, perkenalkan saya ${nama.val()}, saya ingin memesan: ${sebuahorder.val()}`;

    const encode = encodeURI(pesanKirim);
    const waUrl = `https://wa.me/${nomorHp}?text=${encode}`;

    // 5. Buka link WA di tab baru
    window.open(waUrl, "_blank");

    // 6. Kosongkan kembali form setelah terkirim
    nama.val("");
    sebuahorder.val("");
  });
});
