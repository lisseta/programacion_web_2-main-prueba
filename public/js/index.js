let checkbox = document.getElementById("validacion");
checkbox.addEventListener('change', function() {
    if (this.checked) {
        document.getElementById("btn_enviar").disabled = false;
    } else {
        document.getElementById("btn_enviar").disabled = true;
    }
});