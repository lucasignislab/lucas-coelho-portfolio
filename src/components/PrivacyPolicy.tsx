import { useEffect } from "react";
import { contactEmail } from "@/data/site";

const sections = [
	{
		title: "Quem cuida dos seus dados",
		content: (
			<p>
				Lucas Coelho é o responsável pelo tratamento dos dados pessoais neste
				portfólio. Para dúvidas, solicitações ou exercício de direitos, escreva
				para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
			</p>
		),
	},
	{
		title: "Dados que podem ser coletados",
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
		title: "Como os dados são usados",
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
		title: "Serviços de terceiros",
		content: (
			<>
				<p>
					O site utiliza a Netlify para hospedagem e processamento do formulário de
					contato e o Microsoft Clarity para métricas de uso, mapas de calor e
					gravações de sessão. Campos de formulário são projetados para serem
					mascarados nas análises do Clarity.
				</p>
				<p>
					Esses fornecedores tratam informações segundo seus próprios termos e
					políticas. Dados podem ser processados fora do Brasil, de acordo com as
					medidas de proteção adotadas por cada fornecedor. Este site não vende seus
					dados pessoais.
				</p>
				<div className="privacy-external-links">
					<a
						href="https://clarity.microsoft.com/privacy"
						target="_blank"
						rel="noopener noreferrer"
					>
						Privacidade no Microsoft Clarity ↗
					</a>
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
		title: "Cookies e tecnologias semelhantes",
		content: (
			<p>
				O Microsoft Clarity pode usar cookies e tecnologias semelhantes para
				associar interações realizadas durante a navegação e produzir métricas
				agregadas. Você pode restringir ou apagar cookies nas configurações do seu
				navegador. A restrição pode reduzir a precisão das métricas, mas não impede
				o acesso ao conteúdo principal deste portfólio.
			</p>
		),
	},
	{
		title: "Retenção e segurança",
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
		title: "Seus direitos",
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
		title: "Atualizações desta política",
		content: (
			<p>
				Esta política pode ser atualizada para refletir mudanças no site, nos
				serviços utilizados ou na legislação. A versão vigente estará sempre nesta
				página, acompanhada da data da última atualização.
			</p>
		),
	},
];

export function PrivacyPolicy() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, []);

	return (
		<div className="privacy-page">
			<header className="privacy-header">
				<a href="/" className="privacy-brand" aria-label="Voltar ao portfólio">
					<img src="/favicon-32.png?v=2" alt="" width="32" height="32" />
					<span>Lucas Coelho</span>
				</a>
				<a href="/" className="privacy-back">
					← Voltar ao portfólio
				</a>
			</header>

			<main className="privacy-main">
				<section className="privacy-hero" aria-labelledby="privacy-title">
					<p className="eyebrow">Transparência e proteção de dados</p>
					<h1 id="privacy-title">Política de privacidade</h1>
					<p className="privacy-lead">
						Esta página explica, em linguagem direta, quais dados podem ser tratados
						quando você navega pelo portfólio ou entra em contato.
					</p>
					<p className="privacy-updated">Última atualização: 6 de agosto de 2026</p>
				</section>

				<div className="privacy-content">
					{sections.map((section, index) => (
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
