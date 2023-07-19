import { useState } from 'react';
import './App.css';

const faqs = [
	{
		title: 'Where are these chairs assembled?',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
	},
	{
		title: 'How long do I have to return my chair?',
		text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
	},
	{
		title: 'Do you ship to countries outside the EU?',
		text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
	},
];

export default function App() {
	return (
		<div className='app'>
			<Accordion data={faqs} />
		</div>
	);
}

type AccordionProps = {
	data: { title: string; text: string }[];
};

function Accordion({ data }: AccordionProps): JSX.Element {
	const [currentOpenId, setCurrentOpenId] = useState(-1);

	const handleOpenId = (id: number) => {
		setCurrentOpenId(id);
	};

	const renderList = data.map((faq, index) => {
		return (
			<li key={index}>
				<AccordionItem
					id={index}
					question={faq.title}
					answer={faq.text}
					openId={currentOpenId}
					onOpen={(): void => handleOpenId(index)}
				/>
			</li>
		);
	});
	return (
		<>
			<ul className='faqslist'>{renderList}</ul>
		</>
	);
}

type AcordionItemProps = {
	id: number;
	question: string;
	answer: string;
	openId: number;
	onOpen: (id: number) => void | undefined;
};

function AccordionItem({
	id,
	question,
	answer,
	openId,
	onOpen,
}: AcordionItemProps): JSX.Element {
	const isOpen = openId === id;

	const handleOpen = () => {
		onOpen(id);
	};

	const classOpen = isOpen ? 'open' : '';

	return (
		<div onClick={handleOpen} className={`faq ${classOpen}`}>
			<div className='faq__question'>
				<h1 className={classOpen}>
					<span className={`number ${classOpen}`}>
						{String(id).padStart(2, '0')}
					</span>
					{question}
				</h1>
				<button onClick={handleOpen}>{isOpen ? '-' : '+'}</button>
			</div>
			{isOpen && <p>{answer}</p>}
		</div>
	);
}
