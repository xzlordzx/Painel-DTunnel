class ApkDownloadModal {
    __html = `
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel">BAIXAR APK</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-2">
                <div class="d-flex flex-column gap-2 justify-content-center">
                    <div class="card">
                        <div class="card-body p-2">
                            <h5 class="card-title d-flex justify-content-center">DTunnel</h5>
                            <p class="card-text">Modos de conexão: SSH, OpenVPN, DNSTT, V2RAY</p>
                            <a href="#" class="btn btn-dark w-100 mt-2">BAIXAR</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    constructor() {
        this._element = document.createElement('div');
        this._element.classList.add('modal', 'fade');
        this._element.setAttribute('tabindex', '-1');
        this._element.innerHTML = this.__html;

        this._root = this._element.querySelector('.modal-body');
        this.modal = new bootstrap.Modal(this._element);
    }

    setApp(app) {
        this._root.innerHTML = '';
        this._root.append(app.element);
    }

    setFooter(footer) {
        this._root.append(footer.element);
    }

    show() {
        this.modal.show();
    }

    hide() {
        this.modal.hide();
    }
}

export default ApkDownloadModal;