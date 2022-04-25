import { html, LitElement, css } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';

class UserCard extends LitElement {

    constructor() {
        super();
        this.showInfo = true;
    }

    static get properties() {
        return {
            name: {type: String},
            city: {type: String},
            phone: {type: Number},
            avatar: {type: String}
        }
    }

    static get styles() {
        return [css` 
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
            } `
        ];
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        this.requestUpdate();
    }

    render() {
        return html 
        `
            <div class="user-card">
                <img src='${this.avatar}'/>
                <div>
                    <h3>${this.name}</h3>
                    ${
                        this.showInfo 
                        ? html `<div class="info">
                                    <p>city: <slot name="city" /></p>
                                    <p>phone: <slot name="phone" /></p>
                                </div>`
                        :  ``
                    }
                    <button @click="${this.toggleInfo}"> ${this.showInfo ? 'Hide Info' : 'Show Info'} </button>
                </div>
            </div>
        `
    }
}

customElements.define('user-card', UserCard);