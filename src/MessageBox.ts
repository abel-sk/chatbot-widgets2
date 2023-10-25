import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import {when} from "lit/directives/when.js";
import { map } from "lit/directives/map.js";

type Option = {
    value: String,
    label: String,
    trigger: String
}

export class MessageBox extends LitElement{
    static styles = css`
    .message.chatbot>.body{
        max-width: 250px;
        padding: 10px;
        width: fit-content;
        border-radius: 10px 10px 10px 0px;
        background-color: #6371F2;
        color: #ffffff;
    }

    .message.user>.body{
        max-width: 250px;
        width: fit-content;
        padding: 10px;
        border-radius: 10px 10px 0px 10px;
        background-color: #ffffff;
        color: #333333;
        margin-left: auto;
    }

    .options{
        display: flex;
        margin-top: 10px;
        flex-direction: column;
        gap: 5px;
    }

    .option{
        padding: 10px;
        border-radius: 30px;
        background-color: #ffffff;
        color: #6371F2;
        width: fit-content;
        border: 2px solid #6371F2;
        font-weight: bold;
        cursor: pointer;
    }

    .hidden{
        opacity: 0%;
        transition: opacity 0.2s ease-in;
        transform: scale(0);
        transition: transform 0s 0.2s;
    }
    `

    @property({attribute: true, reflect: true, type: String})
    sender = "chatbot"

    @property({attribute: true, reflect: true, type: String})
    profilePicture = ""

    @property({attribute: true, reflect: true, type: String})
    message: String = ""

    @property({attribute: true, reflect: true, type: String})
    messageId: String = ""

    @property({attribute: true, reflect: true, type: Array})
    options: Option[] = []

    render(){
        return html`
        <div class=${`message ${this.sender}`}>
            <div class="pfp">
            </div>
            <div class="body">
                ${this.message}
            </div>
            ${when(this.options.length !== 0, () => html`
            <div class="options">
                ${map(this.options, (option) => html`
                <button class="option" @click=${() => this.__handleOptionClick(option)}>
                    ${option.label}
                </button>
                `)}
            </div>
            `, () => html``)}
        </div>
        `
    }

    __handleOptionClick(option: Option){
        const optionEvent = new CustomEvent("select", {
            detail: option,
            bubbles: true, 
            composed: true
        })
        
        this.dispatchEvent(optionEvent)
    }

}