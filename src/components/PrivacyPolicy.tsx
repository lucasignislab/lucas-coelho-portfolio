import { useEffect } from "react";
import { contactEmail } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbs } from "@/data/seo";
import { localizePath } from "@/i18n/locale";
import { useLocale } from "@/i18n/useTranslations";

const sections = [
	{
		title: "Quem cuida dos seus dados?",
		content: (
			<p>
				Lucas Coelho é o responsável pelo tratamento dos dados pessoais neste
				portfólio. Para dúvidas, solicitações ou exercício de direitos, escreva
				para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
			</p>
		),
	},
	{
		title: "Quais dados podem ser coletados?",
		content: (
			<>
				<p>Este site pode tratar duas categorias de informações:</p>
				<ul>
					<li>
						<strong>Dados enviados por você:</strong> nome, e-mail, empresa,
						tipo de projeto ou oportunidade, faixa de investimento, modelo de
						trabalho e o conteúdo da mensagem enviada pelo formulário.
					</li>
					<li>
						<strong>Dados de navegação:</strong> páginas acessadas, cliques,
						movimentos do mouse, rolagem, características do navegador e do
						dispositivo e informações técnicas semelhantes.
					</li>
				</ul>
			</>
		),
	},
	{
		title: "Como os dados são usados?",
		content: (
			<>
				<p>As informações são utilizadas para:</p>
				<ul>
					<li>responder mensagens, propostas e oportunidades profissionais;</li>
					<li>dar continuidade a conversas ou relações contratuais solicitadas;</li>
					<li>entender o uso do site e melhorar conteúdo, desempenho e usabilidade;</li>
					<li>prevenir abuso, fraude e incidentes de segurança.</li>
				</ul>
				<p>
					O tratamento ocorre conforme a finalidade aplicável, incluindo a execução
					de procedimentos solicitados por você, o cumprimento de obrigações legais
					e o legítimo interesse em operar e aprimorar este portfólio, sempre com
					respeito aos seus direitos.
				</p>
			</>
		),
	},
	{
		title: "Quais serviços de terceiros são usados?",
		content: (
			<>
				<p>
					O site utiliza a Netlify para hospedagem e processamento do formulário de
					contato, além do Google Analytics 4 e do Umami para entender o uso do site.
				</p>
				<p>
					Esses fornecedores tratam informações segundo seus próprios termos e
					políticas. Dados podem ser processados fora do Brasil, de acordo com as
					medidas de proteção adotadas por cada fornecedor. Este site não vende seus
					dados pessoais.
				</p>
				<div className="privacy-external-links">
					<a
						href="https://www.netlify.com/privacy/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Política de privacidade da Netlify ↗
					</a>
				</div>
			</>
		),
	},
	{
		title: "Como funcionam cookies e tecnologias semelhantes?",
		content: (
			<p>
				O Google Analytics 4 pode usar cookies e tecnologias semelhantes para
				medir o uso do site. O Umami é usado para métricas de audiência. Você pode
				restringir ou apagar cookies nas configurações do seu navegador. A restrição
				pode reduzir a precisão de algumas métricas, mas não impede o acesso ao
				conteúdo principal deste portfólio.
			</p>
		),
	},
	{
		title: "Como os dados são retidos e protegidos?",
		content: (
			<p>
				Os dados são mantidos apenas pelo tempo necessário para cumprir as
				finalidades descritas, atender obrigações legais ou resguardar direitos.
				São adotadas medidas razoáveis de segurança, mas nenhum serviço conectado à
				internet oferece proteção absoluta contra incidentes.
			</p>
		),
	},
	{
		title: "Quais são seus direitos?",
		content: (
			<p>
				Nos termos da LGPD, você pode solicitar confirmação do tratamento, acesso,
				correção, anonimização, bloqueio ou eliminação de dados, informações sobre
				compartilhamento, portabilidade quando aplicável, oposição e revogação do
				consentimento. Para fazer uma solicitação, use o e-mail indicado nesta
				página. Poderão ser solicitadas informações para confirmar sua identidade.
			</p>
		),
	},
	{
		title: "Quando esta política é atualizada?",
		content: (
			<p>
				Esta política pode ser atualizada para refletir mudanças no site, nos
				serviços utilizados ou na legislação. A versão vigente estará sempre nesta
				página, acompanhada da data da última atualização.
			</p>
		),
	},
];

const englishSections = [
	{
		title: "Who is responsible for your data?",
		content: <p>Lucas Coelho is responsible for processing personal data through this portfolio. For questions, requests, or to exercise your rights, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>,
	},
	{
		title: "What data may be collected?",
		content: <><p>This website may process two categories of information:</p><ul><li><strong>Information you submit:</strong> name, email address, company, project or opportunity type, budget range, work arrangement, and the message you send through the form.</li><li><strong>Browsing information:</strong> pages visited, clicks, mouse movement, scrolling, browser and device characteristics, and similar technical information.</li></ul></>,
	},
	{
		title: "How is the data used?",
		content: <><p>Information may be used to:</p><ul><li>respond to messages, project inquiries, and professional opportunities;</li><li>continue conversations or contractual relationships you request;</li><li>understand website usage and improve content, performance, and usability;</li><li>prevent abuse, fraud, and security incidents.</li></ul><p>Processing is based on the applicable purpose, including steps you request before entering into a contract, compliance with legal obligations, and the legitimate interest in operating and improving this portfolio, while respecting your rights.</p></>,
	},
	{
		title: "Which third-party services are used?",
		content: <><p>This website uses Netlify for hosting and contact-form processing, as well as Google Analytics 4 and Umami to understand website usage.</p><p>These providers process information under their own terms and policies. Data may be processed outside Brazil, subject to the safeguards adopted by each provider. This website does not sell your personal data.</p><div className="privacy-external-links"><a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Netlify privacy policy ↗</a></div></>,
	},
	{
		title: "How do cookies and similar technologies work?",
		content: <p>Google Analytics 4 may use cookies and similar technologies to measure website usage. Umami is used for audience metrics. You can restrict or delete cookies in your browser settings. Doing so may reduce the accuracy of some metrics, but does not prevent access to the main content of this portfolio.</p>,
	},
	{
		title: "How long is data kept, and how is it protected?",
		content: <p>Data is kept only for as long as necessary to fulfill the purposes described here, meet legal obligations, or protect rights. Reasonable security measures are used, but no internet-connected service can guarantee absolute protection against incidents.</p>,
	},
	{
		title: "What are your rights?",
		content: <p>Under Brazil’s General Data Protection Law (LGPD), you may request confirmation of processing, access, correction, anonymization, blocking or deletion of data, information about sharing, portability where applicable, objection, and withdrawal of consent. To make a request, use the email address on this page. We may ask for information to verify your identity.</p>,
	},
	{
		title: "When is this policy updated?",
		content: <p>This policy may be updated to reflect changes to the website, the services used, or applicable law. The current version will remain available on this page with its latest update date.</p>,
	},
];

export function PrivacyPolicy() {
	const locale = useLocale();
	const en = locale === "en";
	const pageSections = en ? englishSections : sections;
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, []);

	return (
		<div className="privacy-page">
			<header className="privacy-header">
				<a href={localizePath("/", locale)} className="privacy-brand" aria-label={en ? "Back to portfolio" : "Voltar ao portfólio"}>
					<img src="/favicon-32.png?v=2" alt="" width="32" height="32" />
					<span>Lucas Coelho</span>
				</a>
				<a href={localizePath("/", locale)} className="privacy-back">
					← {en ? "Back to portfolio" : "Voltar ao portfólio"}
				</a>
			</header>
			<Breadcrumbs
				items={getBreadcrumbs("/politica-de-privacidade", locale)}
				className="privacy-main privacy-breadcrumbs"
			/>

			<main className="privacy-main">
				<section className="privacy-hero" aria-labelledby="privacy-title">
					<p className="eyebrow">{en ? "Transparency and data protection" : "Transparência e proteção de dados"}</p>
					<h1 id="privacy-title">{en ? "Privacy policy" : "Política de privacidade"}</h1>
					<p className="privacy-lead">
						{en ? "This page explains in plain language what information may be processed when you browse this portfolio or get in touch." : "Esta página explica, em linguagem direta, quais dados podem ser tratados quando você navega pelo portfólio ou entra em contato."}
					</p>
					<p className="privacy-updated">{en ? "Last updated: August 6, 2026" : "Última atualização: 6 de agosto de 2026"}</p>
				</section>

				<div className="privacy-content">
					{pageSections.map((section, index) => (
						<section key={section.title} className="privacy-section">
							<span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
							<div>
								<h2>{section.title}</h2>
								{section.content}
							</div>
						</section>
					))}
				</div>
			</main>

			<footer className="privacy-footer">
				<p>© {new Date().getFullYear()} Lucas Coelho.</p>
				<a href={`mailto:${contactEmail}`}>{contactEmail}</a>
			</footer>
		</div>
	);
}
