import React, { useState } from 'react'
import {
    Button,
    Avatar,
    Tag,
    Timeline,
    Card,
    Input,
    Select,
} from 'components/ui'
import { Container } from 'components/shared'
import { AiOutlineSetting } from 'react-icons/ai'
import { MdOutlineContentPasteOff } from 'react-icons/md'

const EditSite = () => {
    const [hero, setHero] = useState({
        title: '',
        subTitle: '',
        helperText: '',
        primaryButton: {
            show: false,
            label: '',
            link: '',
        },
        signUpForm: {
            show: true,
            placeholder: '',
            buttonLabel: '',
            link: '',
        },
    })
    const [features, setFeatures] = useState({
        show: true,
        feature1: {
            show: true,
            title: '',
            description: '',
            imageURL: '',
            buttonLabel: '',
            buttonURL: '',
            showReview: false,
            review: '',
            name: '',
            reviewLabel: '',
            photoURL: '',
        },
        feature2: {
            show: true,
            title: '',
            description: '',
            imageURL: '',
            buttonLabel: '',
            buttonURL: '',
            showReview: false,
            review: '',
            name: '',
            reviewLabel: '',
            photoURL: '',
        },
    })
    const [faq, setFaq] = useState({
        show: true,
        title: '',
        faq1: {
            show: true,
            question: '',
            answer: '',
        },
        faq2: {
            show: true,
            question: '',
            answer: '',
        },
    })

    const [cta, setCta] = useState({
        show: true,
        title: '',
        name: '',
        Qoute: '',
        primaryButton: {
            show: true,
            buttonLabel: '',
            buttonURL: '',
        },
        signUpForm: {
            show: true,
            placeholder: '',
            buttonLabel: '',
        },
    })

    const [note, setNote] = useState({
        show: true,
        title: '',
        content: '',
        name: '',
        role: '',
        imageURL: '',
    })

    const [footer, setFooter] = useState({
        show: true,
        content: '',
        links: {
            title: '',
            link: '',
            show: true,
        },
        socials: {
            network: '',
            link: '',
            show: true,
        },
        primaryButton: {
            buttonLabel: '',
            buttonURL: '',
            show: true,
        },
    })

    const [testimonials, setTestimonials] = useState({
        show: true,
        name: '',
        label: '',
        testimonial: '',
        imageURL: '',
    })

    function ShowHideElement(ElementID) {
        let Type = document.getElementById(ElementID).style.display
        if (Type == 'none') {
            document.getElementById(ElementID).style.display = 'block'
        } else {
            document.getElementById(ElementID).style.display = 'none'
        }
    }

    function CustomInput(props) {
        return props.textArea == true ? (
            <Input
                className="mt-2"
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                textArea
            />
        ) : (
            <Input
                className="mt-2"
                type="text"
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        )
    }

    function CustomButton(props) {
        return (
            <Button
                className={
                    props.m == 'mt-2'
                        ? 'mt-2 mb-2 bg-gray-200'
                        : 'mb-2 text-left bg-gray-200'
                }
                block
                onClick={() => ShowHideElement(props.sectionName)}
            >
                {props.name}
            </Button>
        )
    }

    function CustomLabel(props) {
        return props.type == 'h5' ? (
            <h5 className="mt-1 ">{props.name}</h5>
        ) : (
            <h6 className="mt-2 text-sm">{props.name}</h6>
        )
    }

    function CustomCheckBox(props) {
        return (
            <>
                <input
                    type="checkbox"
                    id={props.value}
                    name={props.value}
                    value={props.value}
                    onChange={props.onChange}
                    onClick={props.onClick}
                />
                {props.text}
            </>
        )
    }

    return (
        <Container className="h-full">
            <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-4">
                {/*Static Site */}
                <div
                    className="lg:col-span-3"
                    style={{ height: '590px', overflowY: 'scroll' }}
                >
                    {' '}
                    <div
                        class="site-content bg-white overflow-hidden"
                        data-testid="site-content"
                    >
                        <section
                            id="1wsiesxuc3"
                            class="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48"
                            sectionname="hero"
                            sectioncomponent="Hero"
                            sortorder="0"
                        >
                            <div class="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
                                <div>
                                    <div class="space-x-2 flex items-center">
                                        <img
                                            class="h-8 w-auto"
                                            src="https://storage.googleapis.com/mixo-files/logos/portfoliOnline-1678971381082.svg"
                                            alt="PortfoliOnline logo"
                                        />
                                        <p class="text-2xl font-sans font-bold text-gray-900">
                                            PortfoliOnline
                                        </p>
                                    </div>
                                    <div class="mt-14">
                                        <div class="mt-6 sm:max-w-xl">
                                            <h1 class="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                                                <span class="text-primary">
                                                    {hero.title ||
                                                        'Elevate your career with a stunning portfolio website'}
                                                </span>
                                            </h1>
                                            <h2 class="mt-6 text-lg text-gray-500 sm:text-xl">
                                                {hero.subTitle ||
                                                    'Showcasing your talents has never been easier. Build a professional online presence with PortfoliOnline.'}
                                            </h2>
                                        </div>
                                        <div class="mt-10 space-y-4">
                                            <p class="text-sm text-gray-400">
                                                {hero.helperText ||
                                                    'This Is helper text'}
                                            </p>
                                            <button
                                                to={hero.primaryButton.link}
                                                class="ui-button ui-button-base ui-button-primary"
                                                style={{
                                                    display: hero.primaryButton
                                                        .show
                                                        ? 'block'
                                                        : 'none',
                                                }}
                                                type="submit"
                                            >
                                                {hero.primaryButton
                                                    .buttonLabel ||
                                                    'Get Started'}
                                            </button>
                                            <ile-root
                                                id="ile-1"
                                                class="mt-4 sm:max-w-lg"
                                            >
                                                <form
                                                    style={{
                                                        display: hero.signUpForm
                                                            .show
                                                            ? 'block'
                                                            : 'none',
                                                    }}
                                                    class="grid gap-2 grid-cols-1 sm:w-full sm:flex sm:items-center sm:flex-wrap mt-4 sm:max-w-lg"
                                                >
                                                    <label
                                                        for="hero-email"
                                                        class="sr-only"
                                                    >
                                                        Email address
                                                    </label>
                                                    <input
                                                        id="hero-email"
                                                        type="email"
                                                        class="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary focus-visible:ring-primary flex-1"
                                                        required
                                                        placeholder={
                                                            hero.signUpForm
                                                                .placeholder ||
                                                            'Enter your email here...'
                                                        }
                                                    />
                                                    <div>
                                                        <button
                                                            to
                                                            class="ui-button ui-button-base ui-button-primary"
                                                            type="submit"
                                                        >
                                                            {hero.signUpForm
                                                                .buttonLabel ||
                                                                'submit'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </ile-root>
                                            <script></script>
                                            {/* <script type="module" async>
                                      import{h as e,c as m}from"/site/portfoli-online-gf24e/assets/iles.54b00b61.js";import{c as o}from"/site/portfoli-online-gf24e/assets/SignupForm.8cfa132a.js";import"/site/portfoli-online-gf24e/assets/vendor-vue.398eccbf.js";import"/site/portfoli-online-gf24e/assets/UiButton.9479e401.js";import"/site/portfoli-online-gf24e/assets/vite.c27b6911.js";e(m,o,"ile-1",{name:"hero",placeholder:"Enter your email...",buttonLabel:"Submit",siteId:"7HdAkkQ7izslLfyDe7dL",class:"mt-4 sm:max-w-lg"},{});

                                  </script> */}
                                        </div>
                                        {/* <!-- Social Proofing -->
                              <!-- User Review --> */}
                                        <div class="mt-6">
                                            <div class="inline-flex items-center">
                                                <img
                                                    src="https://storage.googleapis.com/mixo-files/public/img/avatars/female-2.png"
                                                    alt="Alice Riley"
                                                    class="object-cover inline-block mr-3 border-2 border-primary rounded-full sm:mr-2 h-14 w-14"
                                                />
                                                <div>
                                                    <p class="sm:pl-2.5 text-base font-black tracking-tight text-gray-800 sm:text-lg">
                                                        “I never knew how
                                                        important having a
                                                        portfolio website was
                                                        until I created one with
                                                        PortfoliOnline. It has
                                                        truly helped me elevate
                                                        my career.”{' '}
                                                    </p>
                                                    <p class="sm:pl-2.5 text-sm sm:text-base font-bold text-gray-500">
                                                        Alice Riley{' '}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="sm:mx-auto sm:max-w-3xl sm:px-6">
                                <div class="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                                    <div class="hidden sm:block">
                                        <div class="absolute inset-y-0 w-screen left-1/2 bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"></div>
                                        <svg
                                            class="absolute -mr-3 top-8 right-1/2 lg:m-0 lg:left-0"
                                            width="404"
                                            height="392"
                                            fill="none"
                                            viewBox="0 0 404 392"
                                        >
                                            <defs>
                                                <pattern
                                                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                                                    x="0"
                                                    y="0"
                                                    width="20"
                                                    height="20"
                                                    patternUnits="userSpaceOnUse"
                                                >
                                                    <rect
                                                        x="0"
                                                        y="0"
                                                        width="4"
                                                        height="4"
                                                        class="text-gray-200"
                                                        fill="currentColor"
                                                    ></rect>
                                                </pattern>
                                            </defs>
                                            <rect
                                                width="404"
                                                height="392"
                                                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                                            ></rect>
                                        </svg>
                                    </div>
                                    <div class="relative pl-4 -mr:20 sm:-mr-32 md:-mr-16 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:flex lg:items-center xl:pl-12">
                                        <img
                                            class="w-full rounded-l-3xl lg:w-auto 2xl:h-full 2xl:max-w-none"
                                            src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzMzczODV8MHwxfHNlYXJjaHw1fHxwb3J0Zm9saW98ZW58MHwwfHx8MTY3ODk1NDgxNg&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080"
                                            alt="PortfoliOnline"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section
                            class="relative pt-16 pb-32 overflow-hidden bg-white space-y-24"
                            sectionname="features"
                            id="czoqq1qm1k"
                            sectioncomponent="Features"
                            sortorder="1"
                            site-name="PortfoliOnline"
                            site-id="7HdAkkQ7izslLfyDe7dL"
                            site-logo-url="https://storage.googleapis.com/mixo-files/logos/portfoliOnline-1678971381082.svg"
                            site-logo-size="md"
                            style={{
                                display: features.show ? 'block' : 'none',
                            }}
                        >
                            <div>
                                <div class="lg:mx-auto lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-6 xl:gap-12 2xl:gap-24">
                                    <div class="lg:col-start-2 lg:mx-0 lg:px-0 lg:pr-8 max-w-xl px-4 mx-auto space-y-6 sm:px-6 lg:py-32">
                                        {/* <!-- Feature --> */}
                                        <div>
                                            <h2 class="text-4xl font-extrabold tracking-tight text-gray-900">
                                                <span class="text-primary">
                                                    {features.feature1.title ||
                                                        'Simple and easy setup .'}
                                                </span>
                                            </h2>
                                            <p class="mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">
                                                {features.feature1
                                                    .description ||
                                                    'Set up your online portfolio in minutes with our user-friendly website builder. No coding skills required.'}
                                            </p>
                                        </div>
                                        {/* <!-- CTA --> */}
                                        <div></div>
                                        {/* <!-- Review --> */}
                                    </div>
                                    {/* <!-- Image --> */}
                                    <div class="lg:col-start-1 mt-12 sm:mt-16 lg:mt-0">
                                        <div class="pr-4 -sm:ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full lg:flex lg:items-center">
                                            <img
                                                class="lg:right-0 rounded-r-xl w-full 3xl:max-h-[44rem] 3xl:object-cover"
                                                src={
                                                    features.feature1
                                                        .imageURL ||
                                                    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzMzczODV8MHwxfHNlYXJjaHw2fHxwb3J0Zm9saW98ZW58MHwwfHx8MTY3ODk1NDgxNg&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080'
                                                }
                                                alt="Simple and easy setup"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    class="lg:mx-auto lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-6 xl:gap-12 2xl:gap-24"
                                    style={{
                                        display: features.feature2.show
                                            ? 'block'
                                            : 'none',
                                    }}
                                >
                                    <div class="lg:mx-auto lg:max-w-3xl xl:pl-12 2xl:pl-20 max-w-xl px-4 mx-auto space-y-6 sm:px-6 lg:py-32">
                                        {/* <!-- Feature --> */}
                                        <div>
                                            <h2 class="text-4xl font-extrabold tracking-tight text-gray-900">
                                                <span class="text-primary">
                                                    {features.feature2.title ||
                                                        'Showcase your work .'}
                                                </span>
                                            </h2>
                                            <p class="mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">
                                                {features.feature2
                                                    .description ||
                                                    'Highlight your best work and give potential clients or employers a glimpse into your skills and experience.'}
                                            </p>
                                        </div>
                                        {/* <!-- CTA --> */}
                                        <div></div>
                                        {/* <!-- Review --> */}
                                    </div>
                                    {/* <!-- Image --> */}
                                    <div class="mt-12 sm:mt-16 lg:mt-0">
                                        <div class="pl-4 sm:-mr-48 sm:-mr-6 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full lg:flex lg:items-center">
                                            <img
                                                class="rounded-l-xl lg:left-0 w-full 3xl:max-h-[44rem] 3xl:object-cover"
                                                src={
                                                    features.feature2
                                                        .imageURL ||
                                                    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzMzczODV8MHwxfHNlYXJjaHwyfHxwb3J0Zm9saW98ZW58MHwwfHx8MTY3ODk1NDgxNg&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080'
                                                }
                                                alt="Showcase your work"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="lg:mx-auto lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-6 xl:gap-12 2xl:gap-24">
                                    <div
                                        class="lg:col-start-2 lg:mx-0 lg:px-0 lg:pr-8 max-w-xl px-4 mx-auto space-y-6 sm:px-6 lg:py-32"
                                        style={{
                                            display: features.feature2.show
                                                ? 'block'
                                                : 'none',
                                        }}
                                    >
                                        {/* <!-- Feature --> */}
                                        <div>
                                            <h2 class="text-4xl font-extrabold tracking-tight text-gray-900">
                                                <span class="text-primary">
                                                    {features.feature2.title ||
                                                        'Stand out from the crowd .'}
                                                </span>
                                            </h2>
                                            <p class="mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">
                                                {features.feature2
                                                    .description ||
                                                    'Impress with a custom design and layout that truly showcases your unique talents and personality.'}
                                            </p>
                                        </div>
                                        {/* <!-- CTA --> */}
                                        <div></div>
                                        {/* <!-- Review --> */}
                                        <div class="pt-6 mt-2 border-t border-gray-200">
                                            <blockquote>
                                                <div>
                                                    <p class="text-base text-gray-500">
                                                        {features.feature2
                                                            .review || '“ghjn”'}
                                                    </p>
                                                </div>
                                                <footer class="mt-3">
                                                    <div class="flex items-center space-x-2">
                                                        <p class="text-sm font-bold text-gray-500 sm:text-base">
                                                            {features.feature2
                                                                .name ||
                                                                'Tim Dunne'}
                                                            <span class="text-xs font-normal text-gray-400 sm:text-sm">
                                                                {features
                                                                    .feature2
                                                                    .reviewLabel ||
                                                                    'hjm'}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                    {/* <!-- Image --> */}
                                    <div class="lg:col-start-1 mt-12 sm:mt-16 lg:mt-0">
                                        <div class="pr-4 -sm:ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full lg:flex lg:items-center">
                                            <img
                                                class="lg:right-0 rounded-r-xl w-full 3xl:max-h-[44rem] 3xl:object-cover"
                                                src={
                                                    features.feature2
                                                        .imageURL ||
                                                    'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzMzczODV8MHwxfHNlYXJjaHwzfHxwb3J0Zm9saW98ZW58MHwwfHx8MTY3ODk1NDgxNg&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080'
                                                }
                                                alt="Stand out from the crowd"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section
                            class="py-12 overflow-hidden bg-primary bg-opacity-80 md:py-20"
                            sectionname="testimonials"
                            id="xucjgzabiu"
                            sectioncomponent="Testimonials"
                            sortorder="2"
                            site-name="PortfoliOnline"
                            site-id="7HdAkkQ7izslLfyDe7dL"
                            site-logo-url="https://storage.googleapis.com/mixo-files/logos/portfoliOnline-1678971381082.svg"
                            site-logo-size="md"
                            style={{
                                display: testimonials.show ? 'block' : 'none',
                            }}
                        >
                            <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <svg
                                    class="absolute transform top-full right-full translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2 rotate-3"
                                    width="404"
                                    height="404"
                                    fill="none"
                                    viewBox="0 0 404 404"
                                    role="img"
                                    aria-labelledby="svg-squares"
                                >
                                    <title id="svg-squares">squares</title>
                                    <defs>
                                        <pattern
                                            id="ad119f34-7694-4c31-947f-5c9d249b21f3"
                                            x="0"
                                            y="0"
                                            width="20"
                                            height="20"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <rect
                                                x="0"
                                                y="0"
                                                width="4"
                                                height="4"
                                                class="text-primary"
                                                fill="currentColor"
                                            ></rect>
                                        </pattern>
                                    </defs>
                                    <rect
                                        width="404"
                                        height="404"
                                        fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
                                    ></rect>
                                </svg>
                                <div class="relative">
                                    <blockquote>
                                        <div class="max-w-3xl mx-auto text-xl font-bold leading-7 text-center text-white md:leading-10 md:text-3xl text-shadow-sm">
                                            <p>
                                                {testimonials.testimonial ||
                                                    '&quot;PortfoliOnline has made it simple for me to showcase my work and skills to potential clients. My portfolio website looks amazing!&quot;'}
                                            </p>
                                        </div>
                                        <footer class="mt-8">
                                            <div class="md:flex md:items-center md:justify-center">
                                                <div class="md:flex-shrink-0">
                                                    <img
                                                        src={
                                                            testimonials.imageURL ||
                                                            'https://storage.googleapis.com/mixo-files/public/img/avatars/male-20.png'
                                                        }
                                                        class="w-10 h-10 mx-auto border-2 border-slate-200 rounded-full shadow-sm object-cover"
                                                        alt="Testimonial"
                                                    />
                                                </div>
                                                <div class="mt-3 text-center md:mt-0 md:ml-3 md:flex md:items-center text-shadow-sm">
                                                    <div class="text-lg font-medium text-white">
                                                        {testimonials.name ||
                                                            'Alessio Sinistra'}
                                                    </div>
                                                </div>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        </section>
                        <section
                            class="px-4 py-12 mx-auto max-w-7xl sm:py-16 sm:px-6 lg:px-8 md:py-24"
                            sectionname="faqs"
                            id="eybsp40byi"
                            sectioncomponent="Faqs"
                            sortorder="3"
                            site-name="PortfoliOnline"
                            site-id="7HdAkkQ7izslLfyDe7dL"
                            site-logo-url="https://storage.googleapis.com/mixo-files/logos/portfoliOnline-1678971381082.svg"
                            site-logo-size="md"
                            style={{ display: faq.show ? 'block' : 'none' }}
                        >
                            <div class="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                                <h2 class="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
                                    {faq.title || 'Questions?'}
                                </h2>
                                <dl class="mt-6 space-y-6 divide-y divide-gray-200">
                                    <div
                                        class="pt-6"
                                        style={{
                                            display: faq.faq1.show
                                                ? 'block'
                                                : 'none',
                                        }}
                                    >
                                        <dt class="text-lg">
                                            <span class="font-medium text-gray-900">
                                                {faq.faq1.question ||
                                                    'How much does it cost? .'}
                                            </span>
                                        </dt>
                                        <dd class="pr-12 mt-2">
                                            <p class="text-base text-gray-500">
                                                {faq.faq1.answer ||
                                                    'Provide your potential customers with an overview of how much they would be paying.'}
                                            </p>
                                        </dd>
                                    </div>
                                    <div
                                        class="pt-6"
                                        style={{
                                            display: faq.faq2.show
                                                ? 'block'
                                                : 'none',
                                        }}
                                    >
                                        <dt class="text-lg">
                                            <span class="font-medium text-gray-900">
                                                {faq.faq2.question ||
                                                    'Who is this for?'}
                                            </span>
                                        </dt>
                                        <dd class="pr-12 mt-2">
                                            <p class="text-base text-gray-500">
                                                {faq.faq2.answer ||
                                                    'Explain the primary user / customer that is designed for. Also include some benefits that may specifically relate to this customer base.'}
                                            </p>
                                        </dd>
                                    </div>
                                    <div class="pt-6">
                                        <dt class="text-lg">
                                            <span class="font-medium text-gray-900">
                                                What makes this different?
                                            </span>
                                        </dt>
                                        <dd class="pr-12 mt-2">
                                            <p class="text-base text-gray-500">
                                                Include details that give a
                                                competitive advantage over what
                                                else is out there in the market.
                                            </p>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </section>
                        <section
                            class="relative py-12 sm:py-20 md:py-24 lg:py-32"
                            sectionname="cta"
                            id="jzlmroboad"
                            sectioncomponent="Cta"
                            sortorder="4"
                            site-name="PortfoliOnline"
                            site-logo-url="https://storage.googleapis.com/mixo-files/logos/portfoliOnline-1678971381082.svg"
                            site-logo-size="md"
                            data-v-77b1cd82
                            style={{ display: cta.show ? 'block' : 'none' }}
                        >
                            <div
                                aria-hidden="true"
                                class="block"
                                data-v-77b1cd82
                            >
                                <div
                                    class="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl mb-12"
                                    data-v-77b1cd82
                                ></div>
                                <svg
                                    class="absolute -ml-3 top-8 left-1/2"
                                    width="404"
                                    height="392"
                                    fill="none"
                                    viewBox="0 0 404 392"
                                    data-v-77b1cd82
                                >
                                    <defs data-v-77b1cd82>
                                        <pattern
                                            id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                                            x="0"
                                            y="0"
                                            width="20"
                                            height="20"
                                            patternUnits="userSpaceOnUse"
                                            data-v-77b1cd82
                                        >
                                            <rect
                                                x="0"
                                                y="0"
                                                width="4"
                                                height="4"
                                                class="text-gray-200"
                                                fill="currentColor"
                                                data-v-77b1cd82
                                            ></rect>
                                        </pattern>
                                    </defs>
                                    <rect
                                        width="404"
                                        height="392"
                                        fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
                                        data-v-77b1cd82
                                    ></rect>
                                </svg>
                            </div>
                            <div
                                class="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
                                data-v-77b1cd82
                            >
                                <div
                                    class="relative px-6 py-10 overflow-hidden bg-white border-primary border-2 shadow-xl rounded-2xl sm:px-12 sm:py-20"
                                    data-v-77b1cd82
                                >
                                    <div
                                        aria-hidden="true"
                                        class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
                                        data-v-77b1cd82
                                    >
                                        <svg
                                            class="absolute inset-0 w-full h-full"
                                            preserveAspectRatio="xMidYMid slice"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 1463 360"
                                            data-v-77b1cd82
                                        >
                                            <path
                                                class="text-primary/5"
                                                fill="currentColor"
                                                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                                                data-v-77b1cd82
                                            ></path>
                                            <path
                                                class="text-primary/10"
                                                fill="currentColor"
                                                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                                                data-v-77b1cd82
                                            ></path>
                                        </svg>
                                    </div>
                                    <div class="relative" data-v-77b1cd82>
                                        <div
                                            class="flex flex-wrap justify-center w-full mx-auto sm:max-w-3xl"
                                            data-v-77b1cd82
                                        >
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/ben-7656dd36.jpeg"
                                                alt="User ben"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/claire-bfdbc161.jpeg"
                                                alt="User claire"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/iwan-70e1c572.jpeg"
                                                alt="User iwan"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/lori-07099057.jpeg"
                                                alt="User lori"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/mali-a8248c71.webp"
                                                alt="User mali"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="./assets/mi-68a0f720.jpeg"
                                                alt="User mi"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/nim-d6bbfb63.jpeg"
                                                alt="User nim"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/san-3b86301b.jpeg"
                                                alt="User san"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/sanjid-2d7a907f.jpeg"
                                                alt="User sanjid"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/steph-68f47994.jpeg"
                                                alt="User steph"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/zak-be2e6aeb.jpeg"
                                                alt="User zak"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                            <img
                                                src="/site/portfoli-online-gf24e/assets/judith-8d0417f0.jpeg"
                                                alt="User judith"
                                                class="user-avatar"
                                                data-v-77b1cd82
                                            />
                                        </div>
                                        <div
                                            class="mt-6 sm:mt-12 sm:text-center"
                                            data-v-77b1cd82
                                        >
                                            <h2
                                                class="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl md:leading-tight md:max-w-4xl md:mx-auto"
                                                data-v-77b1cd82
                                            >
                                                {cta.title ||
                                                    'Get started with Portfolio Online today'}
                                                <span
                                                    class="text-primary"
                                                    data-v-77b1cd82
                                                >
                                                    .
                                                </span>
                                            </h2>
                                        </div>
                                        <div
                                            class="mt-6 sm:mt-12 sm:mx-auto sm:max-w-lg flex flex-col items-center"
                                            data-v-77b1cd82
                                        ></div>
                                        <ile-root
                                            id="ile-4"
                                            class="mt-6 sm:mt-12 sm:mx-auto sm:max-w-lg"
                                        >
                                            <form
                                                class="grid gap-2 grid-cols-1 sm:w-full sm:flex sm:items-center sm:flex-wrap mt-6 sm:mt-12 sm:mx-auto sm:max-w-lg"
                                                style={{
                                                    display: cta.signUpForm.show
                                                        ? 'block'
                                                        : 'none',
                                                }}
                                            >
                                                <label
                                                    for="cta-email"
                                                    class="sr-only"
                                                >
                                                    Email address
                                                </label>
                                                <input
                                                    id="cta-email"
                                                    type="email"
                                                    class="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary focus-visible:ring-primary flex-1"
                                                    required
                                                    placeholder={
                                                        cta.signUpForm
                                                            .placeholder ||
                                                        'Enter your email...'
                                                    }
                                                />
                                                <div>
                                                    <button
                                                        to
                                                        class="ui-button ui-button-base ui-button-primary"
                                                        type="submit"
                                                    >
                                                        {cta.signUpForm
                                                            .buttonLabel ||
                                                            'Submit'}
                                                    </button>
                                                </div>
                                            </form>
                                        </ile-root>
                                        {/* <script></script>
                              <script type="module" async>
                                  import{h as m,c as t}from"/site/portfoli-online-gf24e/assets/iles.54b00b61.js";import{c as a}from"/site/portfoli-online-gf24e/assets/SignupForm.8cfa132a.js";import"/site/portfoli-online-gf24e/assets/vendor-vue.398eccbf.js";import"/site/portfoli-online-gf24e/assets/UiButton.9479e401.js";import"/site/portfoli-online-gf24e/assets/vite.c27b6911.js";m(t,a,"ile-4",{name:"cta",placeholder:"Enter your email...",buttonLabel:"Submit",siteId:"7HdAkkQ7izslLfyDe7dL",class:"mt-6 sm:mt-12 sm:mx-auto sm:max-w-lg"},{});

                              </script> */}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section
                            class="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 md:py-24 bg-primary/10"
                            sectionname="note"
                            id="s403wezfvq"
                            sectioncomponent="Note"
                            sortorder="5"
                            site-name="PortfoliOnline"
                            site-id="7HdAkkQ7izslLfyDe7dL"
                            site-logo-url="https://storage.googleapis.com/mixo-files/logos/portfoliOnline-1678971381082.svg"
                            site-logo-size="md"
                            data-v-1ff96999
                            style={{ display: note.show ? 'block' : 'none' }}
                        >
                            <h2
                                class="mb-12 text-4xl font-bold text-center"
                                data-v-1ff96999
                            >
                                {note.title ||
                                    'Showcasing your talents has never been easier. Build a professional online presence with PortfoliOnline.'}
                                <span class="text-primary" data-v-1ff96999>
                                    .
                                </span>
                            </h2>
                            <div
                                class="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow"
                                data-v-1ff96999
                            >
                                <div
                                    class="px-4 py-5 space-y-4 sm:p-6"
                                    data-v-1ff96999
                                >
                                    <div class="note-text" data-v-1ff96999>
                                        {note.content ||
                                            'Set up your online portfolio in minutes with our user-friendly website builder. No coding skills required.'}
                                    </div>
                                    <div
                                        class="flex items-center mt-6"
                                        data-v-1ff96999
                                    >
                                        <div data-v-1ff96999>
                                            <p
                                                class="text-xl font-bold"
                                                data-v-1ff96999
                                            >
                                                {note.name || 'Vinay Chauhan'}
                                            </p>
                                            <p data-v-1ff96999>
                                                {note.role || 'Founder'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer
                            class="border-t"
                            sectioncomponent="MixoFooter"
                            style={{ display: footer.show ? 'block' : 'none' }}
                        >
                            <div class="mx-auto max-w-7xl overflow-hidden py-16 px-6 sm:py-24 lg:px-8 space-y-8">
                                <div class="prose sm:text-center sm:mx-auto">
                                    {footer.content ||
                                        'This is Content IN Footer'}
                                </div>
                                {/* <!-- Links -->
                      <!-- Socials --> */}
                                <div class="flex flex-wrap sm:justify-center gap-x-6 gap-y-4">
                                    <a
                                        href="vinay_chauhan765"
                                        class="text-gray-400 hover:text-brand-primary"
                                        target="_blank"
                                    >
                                        <span class="sr-only">facebook</span>
                                        <svg
                                            width="1.2em"
                                            height="1.2em"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 24 24"
                                            class="h-6 w-6"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="instagram.com"
                                        class="text-gray-400 hover:text-brand-primary"
                                        target="_blank"
                                    >
                                        <span class="sr-only">instagram</span>
                                        <svg
                                            width="1.2em"
                                            height="1.2em"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 24 24"
                                            class="h-6 w-6"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                                <div>
                                    {/* <!-- Needs a wrapping div otherwise the space-y-8 class on the parent won't work due to not recognising the SignupForm element --> */}
                                    <ile-root
                                        id="ile-2"
                                        class="sm:mx-auto sm:max-w-lg"
                                    >
                                        <form class="grid gap-2 grid-cols-1 sm:w-full sm:flex sm:items-center sm:flex-wrap sm:mx-auto sm:max-w-lg">
                                            <label
                                                for="cta-email"
                                                class="sr-only"
                                            >
                                                Email address
                                            </label>
                                            <input
                                                id="cta-email"
                                                type="email"
                                                class="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary focus-visible:ring-primary flex-1"
                                                required
                                                placeholder="Enter your email..."
                                            />
                                            <div>
                                                <button
                                                    to
                                                    class="ui-button ui-button-base ui-button-primary"
                                                    type="submit"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </ile-root>
                                    {/* <script></script>
                          <script type="module" async>
                              import{h as t,c as e}from"/site/portfoli-online-gf24e/assets/iles.54b00b61.js";import{c as m}from"/site/portfoli-online-gf24e/assets/SignupForm.8cfa132a.js";import"/site/portfoli-online-gf24e/assets/vendor-vue.398eccbf.js";import"/site/portfoli-online-gf24e/assets/UiButton.9479e401.js";import"/site/portfoli-online-gf24e/assets/vite.c27b6911.js";t(e,m,"ile-2",function(o){return{name:"cta",placeholder:o,buttonLabel:o,siteId:"7HdAkkQ7izslLfyDe7dL",class:"sm:mx-auto sm:max-w-lg"}}(void 0),{});

                          </script> */}
                                </div>
                                <p class="sm:text-center text-xs leading-5 text-gray-500">
                                    © 2023. All rights reserved.
                                </p>
                            </div>
                        </footer>
                        <div
                            class="wrap animate-in fade-in delay-[1000] duration-700"
                            data-v-54be1110
                        ></div>
                    </div>
                </div>

                {/*Edit Side menu */}
                <div
                    className="border-2 border-dark overflow-auto p-2 position-fixed"
                    style={{ height: '590px', overflowY: 'scroll' }}
                >
                    <div className="px-3 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <h3>
                                <AiOutlineSetting />
                            </h3>
                            <h6 className=" text-sm font-bold">
                                <CustomLabel name="Settings" type="h5" />
                            </h6>
                        </div>
                    </div>

                    <CustomButton sectionName="site" name="Site" />
                    {/* <Card
                        className="mt-2 mb-2 "
                        id="site"
                        style={{
                            display: 'none',
                            height: '300px',
                            overflowY: 'scroll',
                        }}
                    >
                        <CustomLabel name="Site Logo" type="h6" />
                        <Card className="mt-2">Image Card</Card>
                        <CustomLabel name="Logo Size" type="h6" />
                        <Select
                            className="mt-2"
                            placeholder="Select Logo Size"
                            options={[
                                {
                                    value: 'small',
                                    label: 'Small',
                                },
                                {
                                    value: 'medium',
                                    label: 'Medium',
                                },
                                {
                                    value: 'large',
                                    label: 'Large',
                                },
                            ]}
                        />
                        <CustomLabel name="Site Name" type="h6" />
                        <CustomInput placeholder="Enter Your Site Name" />
                        <CustomLabel name="SEO Title" type="h6" />
                        <CustomInput placeholder="Enter Your SEO Title" />
                        <CustomLabel name="SEO Description" type="h6" />
                        <CustomInput
                            placeholder="Enter Your SEO Description"
                            textArea={true}
                        />
                        <CustomLabel name="Site Social Image" type="h6" />
                        <Card className="mt-2">Image Card</Card>
                    </Card> */}

                    <div className="px-3 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <h3>
                                <MdOutlineContentPasteOff />
                            </h3>
                            <h6 className=" text-sm font-bold">
                                <CustomLabel name="Content" type="h5" />
                            </h6>
                        </div>
                    </div>

                    {/*Hero Section Side Menu */}
                    <CustomButton sectionName="hero" name="Hero" />

                    <Card
                        className="mt-2 mb-2"
                        id="hero"
                        style={{ display: 'none' }}
                    >
                        <CustomLabel name="Title" type="h6" />
                        <CustomInput
                            placeholder="Enter Your Title"
                            value={hero.title}
                            onChange={(e) => {
                                setHero((prev) => {
                                    return { ...prev, title: e.target.value }
                                })
                            }}
                        />
                        <Input
                            type="text"
                            className="mt-2"
                            value={hero.title}
                            onChange={(e) => {
                                setHero((prev) => {
                                    return { ...prev, title: e.target.value }
                                })
                            }}
                        />

                        <CustomLabel name="Subtitle" type="h6" />
                        <Input
                            type="text"
                            className="mt-2"
                            value={hero.subTitle}
                            onChange={(e) => {
                                setHero((prev) => {
                                    return { ...prev, subTitle: e.target.value }
                                })
                            }}
                        />

                        <CustomLabel name="Helper Text" type="h6" />
                        <Input
                            type="text"
                            className="mt-2"
                            placeholder="Enter Your Helper Text"
                            value={hero.helperText}
                            onChange={(e) => {
                                setHero((prev) => {
                                    return {
                                        ...prev,
                                        helperText: e.target.value,
                                    }
                                })
                            }}
                        />

                        <CustomButton
                            sectionName="heroprimarybutton"
                            name="Primary Button"
                            m="mt-2"
                        />

                        <Card
                            id="heroprimarybutton"
                            style={{ display: 'none' }}
                        >
                            <CustomCheckBox
                                text="Show CTA Button"
                                value={hero.primaryButton.show}
                                onClick={(e) => {
                                    setHero((prev) => {
                                        return {
                                            ...prev,
                                            primaryButton: {
                                                ...prev.primaryButton,
                                                show: !hero.primaryButton.show,
                                            },
                                        }
                                    })
                                }}
                            />
                            <CustomLabel name="Button Label" type="h6" />
                            <Input
                                type="text"
                                className="mt-2"
                                placeholder="Enter Button Text"
                                value={hero.primaryButton.placeholder}
                                onChange={(e) => {
                                    setHero((prev) => {
                                        return {
                                            ...prev,
                                            primaryButton: {
                                                ...hero.primaryButton,
                                                placeholder: e.target.value,
                                            },
                                        }
                                    })
                                }}
                            />

                            <CustomLabel name="Button Link" type="h6" />
                            <Input
                                type="text"
                                className="mt-2"
                                placeholder="Enter Button Text"
                                value={hero.primaryButton.buttonLabel}
                                onChange={(e) => {
                                    setHero((prev) => {
                                        return {
                                            ...prev,
                                            primaryButton: {
                                                ...hero.primaryButton,
                                                buttonLabel: e.target.value,
                                            },
                                        }
                                    })
                                }}
                            />
                        </Card>
                        <CustomButton
                            sectionName="herosignupform"
                            name="SignUp Form"
                            m="mt-2"
                        />

                        <Card id="herosignupform" style={{ display: 'none' }}>
                            <CustomCheckBox
                                text="Show Signup Form"
                                value={hero.signUpForm.show}
                                onClick={(e) => {
                                    setHero((prev) => {
                                        return {
                                            ...prev,
                                            signUpForm: {
                                                ...prev.signUpForm,
                                                show: !hero.signUpForm.show,
                                            },
                                        }
                                    })
                                }}
                            />

                            <CustomLabel name="Placeholder" type="h6" />
                            <Input
                                type="text"
                                className="mt-2"
                                placeholder="Enter your Email.."
                                value={hero.signUpForm.placeholder}
                                onChange={(e) => {
                                    setHero((prev) => {
                                        return {
                                            ...prev,
                                            signUpForm: {
                                                ...hero.signUpForm,
                                                placeholder: e.target.value,
                                            },
                                        }
                                    })
                                }}
                            />

                            <CustomLabel name="Button Label" type="h6" />
                            <Input
                                type="text"
                                className="mt-2"
                                placeholder="Button Label"
                                value={hero.signUpForm.buttonLabel}
                                onChange={(e) =>
                                    setHero((prev) => {
                                        return {
                                            ...prev,
                                            signUpForm: {
                                                ...prev.signUpForm,
                                                buttonLabel: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />
                        </Card>
                    </Card>

                    {/*Features Section Side Menu */}
                    <CustomButton sectionName="features" name="Features" />

                    <Card
                        className="mt-2 mb-2"
                        id="features"
                        style={{ display: 'none' }}
                    >
                        <CustomCheckBox
                            text="Show Section"
                            value={features.show}
                            onClick={(e) =>
                                setFeatures((prev) => {
                                    return {
                                        ...prev,
                                        show: !features.show,
                                    }
                                })
                            }
                        />
                        <CustomButton
                            sectionName="feature1"
                            name="Feature"
                            m="mt-2"
                        />

                        <Card id="feature1" style={{ display: 'none' }}>
                            <div
                                style={{ height: '250px', overflowY: 'scroll' }}
                            >
                                <CustomCheckBox
                                    text="Show feature"
                                    value={features.feature1.show}
                                    onClick={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    show: !features.feature1
                                                        .show,
                                                },
                                            }
                                        })
                                    }
                                />
                                <CustomLabel name="Title" type="h6" />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter your Title.."
                                    value={features.feature1.title}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    title: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Description" type="h6" />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter your Description.."
                                    value={features.feature1.description}
                                    textArea={true}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    description: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Image URL" type="h6" />
                                <Card className="mt-2">Image Card</Card>

                                <CustomLabel name="Button Label" type="h6" />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter Button Label"
                                    value={features.feature1.buttonLabel}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    buttonLabel: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Button URL" type="h6" />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter Button URL"
                                    value={features.feature1.buttonURL}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    buttonURL: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Review" type="h6" />
                                <CustomCheckBox
                                    text="Show review"
                                    value={features.feature2.showReview}
                                    onClick={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    showReview:
                                                        !features.feature2
                                                            .showReview,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Review" type="h6" />
                                <Input
                                    className="mt-2"
                                    type="text"
                                    placeholder="Enter Review"
                                    value={features.feature1.review}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    review: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Name" type="h6" />
                                <Input
                                    className="mt-2"
                                    type="text"
                                    placeholder="Enter Name"
                                    value={features.feature1.name}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    name: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Label" type="h6" />
                                <Input
                                    className="mt-2"
                                    type="text"
                                    placeholder="Enter Label"
                                    value={features.feature1.label}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature1: {
                                                    ...prev.feature1,
                                                    label: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Image URL" type="h6" />
                                <Card className="mt-2">Image Card</Card>
                            </div>
                        </Card>

                        <CustomButton
                            sectionName="feature2"
                            name="Feature"
                            m="mt-2"
                        />

                        <Card id="feature2" style={{ display: 'none' }}>
                            <div
                                style={{ height: '250px', overflowY: 'scroll' }}
                            >
                                <CustomCheckBox
                                    text="Show feature"
                                    value={features.feature2.show}
                                    onClick={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    show: !features.feature2
                                                        .show,
                                                },
                                            }
                                        })
                                    }
                                />
                                <CustomLabel name="Title" type="h6" />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter your Title.."
                                    value={features.feature2.title}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    title: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Description" type="h6" />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter your Description.."
                                    value={features.feature2.description}
                                    textArea={true}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    description: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Image URL" type="h6" />
                                <Card className="mt-2">Image Card</Card>

                                <CustomLabel name="Button Label" type="h6" />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter Button Label"
                                    value={features.feature2.buttonLabel}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    buttonLabel: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Button URL" type="h6" />
                                <Input
                                    type="text"
                                    className="mt-2"
                                    placeholder="Enter Button URL"
                                    value={features.feature2.buttonURL}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    buttonURL: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Review" type="h6" />
                                <CustomCheckBox
                                    text="Show review"
                                    value={features.feature2.showReview}
                                    onClick={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    showReview:
                                                        !features.feature2
                                                            .showReview,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Review" type="h6" />
                                <Input
                                    className="mt-2"
                                    type="text"
                                    placeholder="Enter Review"
                                    value={features.feature2.review}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    review: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Name" type="h6" />
                                <Input
                                    className="mt-2"
                                    type="text"
                                    placeholder="Enter Name"
                                    value={features.feature2.name}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    name: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Label" type="h6" />
                                <Input
                                    className="mt-2"
                                    type="text"
                                    placeholder="Enter Label"
                                    value={features.feature2.label}
                                    onChange={(e) =>
                                        setFeatures((prev) => {
                                            return {
                                                ...prev,
                                                feature2: {
                                                    ...prev.feature2,
                                                    label: e.target.value,
                                                },
                                            }
                                        })
                                    }
                                />

                                <CustomLabel name="Image URL" type="h6" />
                                <Card className="mt-2">Image Card</Card>
                            </div>
                        </Card>

                        <Button variant="solid">Add</Button>
                    </Card>

                    {/*Testimonials Section Side Menu */}
                    <CustomButton
                        sectionName="testimonials"
                        name="Testimonials"
                    />

                    <Card
                        className="mt-2 mb-2"
                        id="testimonials"
                        style={{ display: 'none' }}
                    >
                        <CustomCheckBox
                            text="Show Section"
                            value={testimonials.show}
                            onClick={() =>
                                setTestimonials((prev) => {
                                    return { ...prev, show: !prev.show }
                                })
                            }
                        />

                        <CustomLabel name="Name" type="h6" />
                        <Input
                            placeholder="Enter Name.."
                            type="text"
                            className="mt-2"
                            value={testimonials.name}
                            onChange={(e) =>
                                setTestimonials((prev) => {
                                    return { ...prev, name: e.target.value }
                                })
                            }
                        />

                        <CustomLabel name="Label" type="h6" />
                        <Input
                            placeholder="Enter Label"
                            type="text"
                            className="mt-2"
                            value={testimonials.label}
                            onChange={(e) =>
                                setTestimonials((prev) => {
                                    return { ...prev, label: e.target.value }
                                })
                            }
                        />

                        <CustomLabel name="Testimonial" type="h6" />
                        <Input
                            placeholder="Enter Testimonial"
                            textArea={true}
                            type="text"
                            className="mt-2"
                            value={testimonials.testimonial}
                            onChange={(e) =>
                                setTestimonials((prev) => {
                                    return {
                                        ...prev,
                                        testimonial: e.target.value,
                                    }
                                })
                            }
                        />

                        <CustomLabel name="Image url" type="h6" />
                        <Card className="mt-2">Image Card</Card>
                    </Card>

                    {/*Faqs Section Side Menu */}
                    <CustomButton sectionName="faqs" name="Faqs" />

                    <Card
                        className="mt-2 mb-2"
                        id="faqs"
                        style={{ display: 'none' }}
                    >
                        <CustomCheckBox
                            text="Show Section"
                            value={faq.show}
                            onClick={() => {
                                setFaq((prev) => {
                                    return { ...prev, show: !prev.show }
                                })
                            }}
                        />

                        <CustomLabel
                            name="Title"
                            type="h6"
                            onClick={() => alert(faq.show)}
                        />
                        <Input
                            placeholder="Questions.."
                            type="text"
                            className="mt-2"
                            value={faq.title}
                            onChange={(e) =>
                                setFaq((prev) => {
                                    return { ...prev, title: e.target.value }
                                })
                            }
                        />

                        <CustomButton sectionName="faq1" name="Faq1" m="mt-2" />

                        <Card
                            className="mt-2 mb-2"
                            id="faq1"
                            style={{ display: 'none' }}
                        >
                            <CustomCheckBox
                                text="Show Faqs"
                                value={faq.faq1.show}
                                onClick={() => {
                                    setFaq((prev) => {
                                        return {
                                            ...prev,
                                            faq1: {
                                                ...prev.faq1,
                                                show: !prev.faq1.show,
                                            },
                                        }
                                    })
                                }}
                            />

                            <CustomLabel name="Questions" type="h6" />
                            <Input
                                placeholder="Questions"
                                type="text"
                                className="mt-2"
                                value={faq.faq1.question}
                                onChange={(e) =>
                                    setFaq((prev) => {
                                        return {
                                            ...prev,
                                            faq1: {
                                                ...prev.faq1,
                                                question: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />

                            <CustomLabel name="Answer" type="h6" />
                            <CustomInput
                                placeholder="Answer"
                                textArea={true}
                                type="text"
                                className="mt-2"
                                value={faq.faq1.answer}
                                onChange={(e) =>
                                    setFaq((prev) => {
                                        return {
                                            ...prev,
                                            faq1: {
                                                ...prev.faq1,
                                                answer: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />
                        </Card>

                        <CustomButton sectionName="faq2" name="Faq2" />

                        <Card
                            className="mt-2 mb-2"
                            id="faq2"
                            style={{ display: 'none' }}
                        >
                            <CustomCheckBox
                                text="Show Faqs"
                                value={faq.faq2.show}
                                onClick={() => {
                                    setFaq((prev) => {
                                        return {
                                            ...prev,
                                            faq2: {
                                                ...prev.faq2,
                                                show: !prev.faq2.show,
                                            },
                                        }
                                    })
                                }}
                            />

                            <CustomLabel name="Questions" type="h6" />
                            <Input
                                placeholder="Questions"
                                type="text"
                                className="mt-2"
                                value={faq.faq2.question}
                                onChange={(e) =>
                                    setFaq((prev) => {
                                        return {
                                            ...prev,
                                            faq2: {
                                                ...prev.faq2,
                                                question: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />

                            <CustomLabel name="Answer" type="h6" />
                            <CustomInput
                                placeholder="Answer"
                                textArea={true}
                                type="text"
                                className="mt-2"
                                value={faq.faq2.answer}
                                onChange={(e) =>
                                    setFaq((prev) => {
                                        return {
                                            ...prev,
                                            faq2: {
                                                ...prev.faq2,
                                                answer: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />
                        </Card>
                    </Card>

                    {/* Call to Action Section Side Menu */}
                    <CustomButton sectionName="action" name="Call to Action" />

                    <Card
                        className="mt-2 mb-2"
                        id="action"
                        style={{ display: 'none' }}
                    >
                        <CustomCheckBox
                            text=" Show Section"
                            value={cta.show}
                            onClick={() => {
                                setCta((prev) => {
                                    return { ...prev, show: !prev.show }
                                })
                            }}
                        />
                        <CustomLabel name="Title" type="h6" />
                        <Input
                            placeholder="Title"
                            type="text"
                            className="mt-2"
                            value={cta.title}
                            onChange={(e) =>
                                setCta((prev) => {
                                    return { ...prev, title: e.target.value }
                                })
                            }
                        />

                        <CustomLabel name="Name" type="h6" />
                        <CustomInput placeholder="Name" />

                        <CustomLabel name="Quote" type="h6" />
                        <Input
                            placeholder="Quote"
                            textArea={true}
                            type="text"
                            className="mt-2"
                            value={cta.Qoute}
                            onChange={(e) =>
                                setCta((prev) => {
                                    return { ...prev, Qoute: e.target.value }
                                })
                            }
                        />

                        <CustomButton
                            sectionName="actionprimarybutton"
                            name="Primary Button"
                            m="mt-2"
                        />

                        <Card
                            id="actionprimarybutton"
                            style={{ display: 'none' }}
                        >
                            <CustomCheckBox
                                text="Show CTA Button"
                                value={cta.primaryButton.show}
                                onClick={() => {
                                    setCta((prev) => {
                                        return {
                                            ...prev,
                                            primaryButton: {
                                                ...prev.primaryButton,
                                                show: !prev.primaryButton.show,
                                            },
                                        }
                                    })
                                }}
                            />
                            <CustomLabel name="Button Label" type="h6" />
                            <Input
                                placeholder="Enter Button Text"
                                type="text"
                                className="mt-2"
                                value={cta.primaryButton.buttonLabel}
                                onChange={(e) =>
                                    setCta((prev) => {
                                        return {
                                            ...prev,
                                            primaryButton: {
                                                ...prev.primaryButton,
                                                buttonLabel: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />

                            <CustomLabel name="Button Link" type="h6" />
                            <Input
                                placeholder="Enter Button Link"
                                type="text"
                                className="mt-2"
                                value={cta.primaryButton.buttonURL}
                                onChange={(e) =>
                                    setCta((prev) => {
                                        return {
                                            ...prev,
                                            primaryButton: {
                                                ...prev.primaryButton,
                                                buttonURL: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />
                        </Card>

                        <CustomButton
                            sectionName="actionsignupform"
                            name="SignUp Form"
                            m="mt-2"
                        />

                        <Card id="actionsignupform" style={{ display: 'none' }}>
                            <CustomCheckBox
                                text="Show Signup Form"
                                value={cta.signUpForm.show}
                                onClick={() => {
                                    setCta((prev) => {
                                        return {
                                            ...prev,
                                            signUpForm: {
                                                ...prev.signUpForm,
                                                show: !prev.signUpForm.show,
                                            },
                                        }
                                    })
                                }}
                            />

                            <CustomLabel name="Placeholder" type="h6" />
                            <Input
                                placeholder="Enter your Email.."
                                type="text"
                                className="mt-2"
                                value={cta.signUpForm.placeholder}
                                onChange={(e) =>
                                    setCta((prev) => {
                                        return {
                                            ...prev,
                                            signUpForm: {
                                                ...prev.signUpForm,
                                                placeholder: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />

                            <CustomLabel name="Button Label" type="h6" />
                            <Input
                                placeholder="Submit"
                                type="text"
                                className="mt-2"
                                value={cta.signUpForm.buttonLabel}
                                onChange={(e) =>
                                    setCta((prev) => {
                                        return {
                                            ...prev,
                                            signUpForm: {
                                                ...prev.signUpForm,
                                                buttonLabel: e.target.value,
                                            },
                                        }
                                    })
                                }
                            />
                        </Card>
                    </Card>

                    {/* Note Section Side Menu */}
                    <CustomButton sectionName="note" name="Note" />

                    <Card
                        className="mt-2 mb-2"
                        id="note"
                        style={{ display: 'none' }}
                    >
                        <CustomCheckBox
                            text="Show Section"
                            value={note.show}
                            onClick={(e) =>
                                setNote((prev) => {
                                    return { ...prev, show: !prev.show }
                                })
                            }
                        />

                        <CustomLabel name="Title" type="h6" />
                        <Input
                            placeholder="Title"
                            type="text"
                            className="mt-2"
                            value={note.title}
                            onChange={(e) =>
                                setNote((prev) => {
                                    return { ...prev, title: e.target.value }
                                })
                            }
                        />

                        <CustomLabel name="Content" type="h6" />
                        <Input
                            placeholder="Content"
                            textArea={true}
                            type="text"
                            className="mt-2"
                            value={note.content}
                            onChange={(e) =>
                                setNote((prev) => {
                                    return { ...prev, content: e.target.value }
                                })
                            }
                        />

                        <CustomLabel name="Name" type="h6" />
                        <Input
                            placeholder="Name"
                            type="text"
                            className="mt-2"
                            value={note.name}
                            onChange={(e) =>
                                setNote((prev) => {
                                    return { ...prev, name: e.target.value }
                                })
                            }
                        />

                        <CustomLabel name="Role" type="h6" />
                        <CustomInput
                            placeholder="Role"
                            type="text"
                            className="mt-2"
                            value={note.role}
                            onChange={(e) =>
                                setNote((prev) => {
                                    return { ...prev, role: e.target.value }
                                })
                            }
                        />

                        <CustomLabel name="Site Social Image" type="h6" />
                        <Card className="mt-2">Image Card</Card>
                    </Card>

                    {/* Footer Section Side Menu */}
                    <CustomButton sectionName="footer" name="Footer" />

                    <Card
                        className="mt-2 mb-2"
                        id="footer"
                        style={{ display: 'none' }}
                    >
                        <CustomCheckBox text="Show Section" value="footer" />

                        <CustomLabel name="Content" type="h6" />
                        <CustomInput placeholder="Content" textArea={true} />

                        <CustomButton
                            sectionName="links"
                            name="Links"
                            m="mt-2"
                        />

                        <Card
                            className="mt-2 mb-2"
                            id="links"
                            style={{ display: 'none' }}
                        >
                            <CustomCheckBox text="Show Link" value="link" />

                            <CustomLabel name="Title" type="h6" />
                            <CustomInput placeholder="Title" />

                            <CustomLabel name="Link" type="h6" />
                            <CustomInput placeholder="Link" />

                            <Button className="mt-2">Add</Button>
                        </Card>

                        <CustomButton
                            sectionName="socials"
                            name="Socials"
                            m="mt-2"
                        />

                        <Card
                            className="mt-2 mb-2"
                            id="socials"
                            style={{ display: 'none' }}
                        >
                            <CustomCheckBox text="Show Link" value="socials" />

                            <CustomLabel name="Network" type="h6" />
                            <Select
                                className="mt-2"
                                placeholder="Select a Network"
                                options={[
                                    {
                                        value: 'facebook',
                                        label: 'FaceBook',
                                    },
                                    {
                                        value: 'instagram',
                                        label: 'Instagram',
                                    },
                                    {
                                        value: 'linkedin',
                                        label: 'Linkedin',
                                    },
                                    {
                                        value: 'whatsapp',
                                        label: 'WhatsApp',
                                    },
                                ]}
                            />

                            <CustomLabel name="Link" type="h6" />
                            <CustomInput placeholder="Link" />

                            <Button className="mt-2">Add</Button>
                        </Card>

                        <CustomButton
                            sectionName="footerprimarybutton"
                            name="Primary Button"
                            m="mt-2"
                        />
                        <Card
                            id="footerprimarybutton"
                            style={{ display: 'none' }}
                        >
                            <CustomCheckBox
                                text="Show CTA Button"
                                value="cta"
                            />

                            <CustomLabel name="Button Label" type="h6" />
                            <CustomInput placeholder="Enter Button Text" />

                            <CustomLabel name="Button Link" type="h6" />
                            <CustomInput placeholder="Enter Button Link" />
                        </Card>

                        <CustomButton
                            sectionName="footersignupform"
                            name="SignUp Form"
                            m="mt-2"
                        />

                        <Card id="footersignupform" style={{ display: 'none' }}>
                            <CustomCheckBox
                                text="Show Signup Form"
                                value="signupform"
                            />

                            <CustomLabel name="Placeholder" type="h6" />
                            <CustomInput placeholder="Enter your Email.." />

                            <CustomLabel name="Button Label" type="h6" />
                            <CustomInput placeholder="Submit" />
                        </Card>
                        <CustomLabel name="Metadata" type="h6" />
                        <CustomInput placeholder="Enter MetaData" />
                    </Card>
                    <Button variant="solid">Publish</Button>
                </div>
            </div>
        </Container>
    )
}

export default EditSite
