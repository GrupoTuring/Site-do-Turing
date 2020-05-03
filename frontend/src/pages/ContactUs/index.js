import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import logo from '../../assets/logo.png';
import './styles.css';
import {FiPlus} from 'react-icons/fi'
import { BsChatQuoteFill, BsFillPersonFill } from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import {AiFillFileText} from 'react-icons/ai'
import check from '../../assets/check.gif'
import Cabecalho from '../../Tags/Cabecalho.js'
import Rodape from '../../Tags/Rodape.js'


export default function ContactUs () {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [grupo, setGrupo] = useState('')
    const [assunto, setAssunto] = useState('')
    const [mensagem, setMensagem] = useState('')

    const [errorNome, setErrorNome] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorAssunto, setErrorAssunto] = useState('')
    const [errorMensagem, setErrorMensagem] = useState('')

    const [submited, setSubmited] = useState(false)
    const [validated, setValidated] = useState(false)

    useEffect (() => {
        if (submited &&
            !errorNome &&
            !errorEmail &&
            !errorAssunto &&
            !errorMensagem) {

            setValidated(true)

            const data = {
                nome,
                email,
                grupo,
                assunto,
                mensagem
            };

            setNome('')
            setEmail('')
            setGrupo('')
            setAssunto('')
            setMensagem('')

            setTimeout(() => {
                setValidated(false)
            }, 3000)
            
            setSubmited(false)
        }
    }, [submited, errorNome, errorEmail, errorAssunto, errorMensagem])

    function validateNome(nome) {
        if (!nome) {
            setErrorNome('Campo obrigatório.')
        }
        else {
            setErrorNome('')
        }
    }

    function validateEmail(email) {
        if (!email) {
            setErrorEmail('Campo obrigatório.')
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorEmail('E-mail inválido.')
        }
        else {
            setErrorEmail('')
        }
    }

    function validateAssunto(assunto) {
        if (!assunto) {
            setErrorAssunto('Campo obrigatório.')
        }
        else {
            setErrorAssunto('')
        }
    }

    function validateMensagem(mensagem) {
        if (!mensagem) {
            setErrorMensagem('Campo obrigatório.')
        }
        else {
            setErrorMensagem('')
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        setSubmited(true)
 
        validateNome(nome)
        validateEmail(email)
        validateAssunto(assunto)
        validateMensagem(mensagem)
    }


    const faqs = getFaqs()
    const [questionNumber, setQuestionNumber] = useState(null)
  
    function showAnswer(index) {
      setQuestionNumber(questionNumber === index ? null : index);
    }

    function getFaqs() {
        const faqs = [
          {
            question: 'O Sibuya está solteiro?',
            answer: 'Sibuya está solteiro não, minha filha'
          },
          {
            question: 'Quanto custa essa escola?',
            answer: '2000 reais o segundo de aula'
          }
        ];
        return faqs;
      }

    return (
        <div class='container'>
            <Cabecalho />

            <span class="title_form">Contato</span>
            <form class='formulario'>
                <div class='container_entrada'>
                    <BsFillPersonFill color='rgb(100, 100, 100)' size='1.3em'/>
                    <input
                        class={errorNome ? 'entrada_error':'entrada'}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder='Nome'
                    />
                    {errorNome && <p class='text_error_entrada'>{errorNome}</p>}
                </div>
                <div class='container_entrada'>
                    <MdEmail color='rgb(100, 100, 100)' size='1.3em'/>
                    <input
                        class={errorEmail ? 'entrada_error':'entrada'}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='E-mail'
                    />
                    {errorEmail && <p class='text_error_entrada'>{errorEmail}</p>}
                </div>
                <div class='container_entrada'>
                    <FaSuitcase color='rgb(100, 100, 100)' size='1.3em'/>
                    <input
                        class='entrada'
                        value={grupo}
                        onChange={e => setGrupo(e.target.value)}
                        placeholder='Grupo/Empresa'
                    />
                </div>
                <div class='container_entrada'>
                    <BsChatQuoteFill color='rgb(100, 100, 100)' size='1.3em'/>
                    <input
                        class={errorAssunto ? 'entrada_error':'entrada'}
                        value={assunto}
                        onChange={e => setAssunto(e.target.value)}
                        placeholder='Assunto'
                    />
                    {errorAssunto && <p class='text_error_entrada'>{errorAssunto}</p>}
                </div>
                <div class='container_mensagem'>
                    <AiFillFileText color='rgb(100, 100, 100)' size='1.3em'/>
                    <textarea
                        class={errorMensagem ? 'mensagem_error':'mensagem'}
                        value={mensagem}
                        onChange={e => setMensagem(e.target.value)}
                        placeholder='Escreva sua mensagem'
                    />                                   
                    {!validated && <button class='enviar' onClick={handleSubmit}><span>Enviar</span></button>}
                    {validated && <img class='check' src={check} />}
                    <div class='container_text_error_mensagem'>
                        {errorMensagem && <p class='text_error_mensagem'>{errorMensagem}</p>}
                    </div>
                </div>
            </form>

            <div class="faq_and_answer">
                <span class="title_faqs">FAQs</span>
                <div class= "faq_box">
                {faqs.map(({question, answer}, index) => (
                    <div>
                    <div class='question_and_btn'>
                        <p class='question' onClick={() => showAnswer(index)}>{question}</p>
                        <button class="btnAnswer" onClick={() => showAnswer(index)}>
                            <FiPlus size={30} color="#F2994A"/>
                        </button>
                    </div>
                    <p class={`answer${questionNumber === index ? '_show' : '_hidden'}`}>{answer}</p>
                    </div>
                ))}
                </div>
            </div>
            <Rodape />
        </div>
    );
}