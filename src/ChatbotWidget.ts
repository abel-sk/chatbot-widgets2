import { html, css, LitElement, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';

import "./message-box.js"

type Option = {
    value: string,
    label: string,
    trigger: string
}

type MessageSegment = {
    id: string,
    message: string,
    trigger?: string,
    options?: Option[],
    isUser?: Boolean
}

export class ChatbotWidget extends LitElement {
    static styles = css`
    .chatbot-button{
        transform: scale(1);
        position: fixed;
        right: 30px;
        bottom: 50px;
        background-color: var(--chatbot-button-bg, #6371F2);
        padding: 10px;
        border-radius: 50%;
        border: none;
        transition: opacity 0.2s ease-in;
    }

    .chatbot-button:hover{
        background-color: var(--chatbot-button-bg-hover, #505fe4);
    }

    .chatbot-button>svg{
        stroke: #ffffff;
        width: 25px;
        height: 25px;
    }

    .chatbot-button.hidden{
        transform: scale(0);
        transition: transform 0s 0.2s;
    }

    .chatbot-body{
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 50px;
        right: 30px;
        min-height: 500px;
        max-height: 600px;
        min-width: 400px;
        border-radius: 10px;
        box-shadow: 0px 0px 15px #cdcdcd;
        transition: opacity 0.2s ease-in;
        background-color: var(--chatbot-body-background, #f3f3f3);
    }

    header{
        display: flex;
        flex-direction: row;
        padding: 12px;
        justify-content: space-between;
        border-radius: 10px 10px 0px 0px;
        border-bottom: 1px solid #dedede;
        background-color: #ffffff;
        color: #333333;
        align-items: center;
    }

    button{
        appearance: none;
        border: none;
        background-color: #00000000;
    }

    header svg{
        stroke: #555555;
    }

    .hidden{
        opacity: 0%;
        transition: opacity 0.2s ease-in;
    }

    .messages{
        flex-grow: 1;
        padding: 12px;
        flex-direction: column;
        gap: 5px;
        display: flex;
        overflow-y: auto;
    }

    .input{
        min-height: 50px;
        padding: 12px;
        background-color: #ffffff;
        border-radius: 0px 0px 10px 10px;
        border-top: 1px solid #dedede;
        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: center;
    }

    .input svg{
        stroke: #555555;
        width: 20px;
        height: 20px;
    }

    input[type="text"]{
        height: 25px;
        border-radius: 5px;
        padding: 5px 10px 5px 10px;
        flex-grow: 1;
        box-shadow: none;
        border: 1px solid #dedede;
        outline: none;
        background-color: #f3f3f3;
    }

    @media screen and (max-width: 460px){
        .chatbot-body{
            min-width: 200px;
            width: 85vw;
        }
    }
    `

    @property({attribute: true, reflect: true, type: Array})
    messageFlow: MessageSegment[] = [
        {
            id: "hello",
            message: "Hi there! You are seeing this message because I have not been set up.",
            trigger: "next"
        },
        {
            id: "next",
            message: "this is the next message",
            options: [
                {
                    label: "👆test",
                    value: "test",
                    trigger: "end"
                },
                {
                    label: "👆test",
                    value: "test",
                    trigger: "end"
                },
                {
                    label: "👆test",
                    value: "test",
                    trigger: "end"
                }
            ]
        },
        {
            id: "end",
            message: "This is the end"
        }
    ];

    @property({attribute: true, reflect: true, type: String})
    chatbotTitle = "Lorem ipsum";

    @state()
    open = false;

    @state()
    messageSegmentHTML = html``;

    @state()
    conversation: MessageSegment[] = []

    @state()
    conversationId = "hello"

    render(){
        return html`
        <div class=${this.open ? "chatbot-body" : "chatbot-body hidden"}>
            <header>
                <h3>${this.chatbotTitle}</h3>
                <button @click=${this.__toggleOpen}>
                    <!-- https://feathericons.dev/?search=x&iconset=feather -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke: currentColor;">
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                    </svg>
                </button>
            </header>
            <div class="messages">
                ${this.messageSegmentHTML}
            </div>
            <div class="input">
                <input type="text" placeholder="Ask me anything!">
                <button>
                    <!-- https://feathericons.dev/?search=send&iconset=feather -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke: currentColor;">
                    <line x1="22" x2="11" y1="2" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
        <button class=${this.open ? "chatbot-button hidden" : "chatbot-button"} @click=${this.__toggleOpen}>
            <!-- https://feathericons.dev/?search=message-circle&iconset=feather -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke: currentColor;">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        </button>
        `
    }

    __toggleOpen(){
        this.open = !this.open;
    }

    __updateSequence(){
        const messageSegment = this.messageFlow.filter(message => message.id === this.conversationId)[0]
        
        this.conversation.push(messageSegment)

        this.messageSegmentHTML = html``

        for(const message of this.conversation){
            if(message.options && message.id === this.conversationId){
                this.messageSegmentHTML = html`
                    ${this.messageSegmentHTML}
                    <message-box message=${message.message} messageId=${message.id} .options=${message.options}></message-box>
                `
            }else if(message.isUser){
                this.messageSegmentHTML = html`
                    ${this.messageSegmentHTML}
                    <message-box message=${message.message} messageId=${message.id} sender="user"></message-box>
                `
            }else{
                this.messageSegmentHTML = html`
                    ${this.messageSegmentHTML}
                    <message-box message=${message.message} messageId=${message.id}></message-box>
                `
            }
        }

        if(messageSegment.trigger){
            this.conversationId = messageSegment.trigger
        }
    }

    __resetSequence(){
        this.messageSegmentHTML = html``
        this.conversationId = this.messageFlow.at(0)?.id as string
    }

    willUpdate(changedProperties: PropertyValues){
        if((changedProperties.has("open") && changedProperties.has("conversationId")) || (changedProperties.has("conversationId") && this.open)){
            this.__updateSequence()
        }
    }

    firstUpdated(){
        this.__updateSequence()

        this.addEventListener("select", (ev) => {
            this.conversationId = (ev as CustomEvent).detail.trigger

            const message: MessageSegment = {
                id: (ev as CustomEvent).detail.value,
                message: (ev as CustomEvent).detail.label,
                trigger: (ev as CustomEvent).detail.trigger,
                isUser: true
            }
            this.conversation.push(message)

            this.requestUpdate()
        })
    }
}
