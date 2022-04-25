const template = document.createElement('template');
template.innerHTML = `
    <style>
        h3 {
            color: white;
            text-shadow: 0px 0px 2px grey;
        }
        img {
            width: 250px;
            border-radius: 15px;
            margin: 0 20px 0 0;
        }
        .user-card {
            display: flex;
            background: lightgrey;
            padding: 20px;
            margin: 10px;
            border-radius: 15px;
            box-shadow: 3px 3px 7px -2px grey;
        }
        button {
            background: white;
            border: none;
            border-radius: 3px;
            padding: 7px 11px;
            color: green;
            cursor: pointer;
            transition: .3s;
        }
        slot{
            display: inline-block;
            color: black;
        }
        p {
            color: grey;
        }
        button:hover {
            box-shadow: 1px 1px 2px 0px #0080009e;
        }
    </style>
    <div class="user-card">
        <img />
        <div>
            <h3></h3>
            <div class="info">
                <p>city: <slot name="city" /></p>
                <p>phone: <slot name="phone" /></p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`

class UserCard extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo){
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show info';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info')
        .addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info')
        .removeEventListener();
    }
}

window.customElements.define('user-card', UserCard);