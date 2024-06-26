import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const faqsData = {
  "faqs": [
    {
      title: "O que é o Mariposas Digitais?",
      content: "Somos uma plataforma destinada a <b>facilitar a conexão entre mulheres atuantes na área de tecnologia (madrinhas) e meninas entre treze (13) e dezoito (18) anos interessadas em tecnologia (afilhadas)</b>. Atuando como <b>intermediadora</b>, visamos proporcionar um ambiente onde madrinhas possam compartilhar seus conhecimentos, insights e experiências com meninas que desejam conhecer, aprender e se desenvolver na área. Essa troca de conhecimento e direcionamento visa reduzir as lacunas de gênero existentes no setor, apresentando a tecnologia como uma opção de carreira e incentivando a aspiração de jovens nessa área."
    },
    {
      title: "Como faço para obter apadrinhamento?",
      content: "Para obter apadrinhamento, basta seguir os passos:<br>1. <b>Cadastre-se</b> em nossa plataforma, inserindo seus dados básicos.</br>2. Selecione a opção <b>\"Desejo ser afilhada - receber apadrinhamento\"</b>.<br>3. <b>Complete seu perfil</b>, contando um pouco sobre você, seu nível de conhecimento na área e seus interesses e metas.</br>Isso ajudará as madrinhas a te conhecerem melhor e a realizarem o apadrinhamento.<br><br>Depois disso, basta aguardar a conexão de uma madrinha para iniciar a sua transformação!</br></br>"
    },
    {
      title: "Como faço para me voluntariar como madrinha?",
      content: "Para se tornar uma madrinha, basta seguir os passos:<br>1. <b>Cadastre-se</b> em nossa plataforma, inserindo seus dados básicos.</br>2. Selecione a opção <b>\"Desejo ser madrinha\"</b>.<br>3. <b>Complete seu perfil</b>, contando um pouco sobre sua área de atuação, disponibilidade, interesses e metas.</br>Isso ajudará a gerar identificação com sua afilhada no contato inicial.<br><br>Depois disso, visualize as diversas meninas disponíveis e oferte apadrinhamento!</br></br>"
    }
  ]
};

const ExpandableCardContent = ({ expanded, children }) => (
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <Typography variant="body1">
        <div dangerouslySetInnerHTML={{ __html: children }} />
      </Typography>
    </CardContent>
  </Collapse>
);

const ExpandableCard = ({ title, content }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '100%', marginBottom: 6, bgcolor: '#ddeff8', paddingRight: 4, paddingLeft: 4 }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#737678', fontSize: '20px', fontWeight: "600" }}>
            {title}
          </Typography>
        }
        action={
          <div
            onClick={handleExpandClick}
            aria-expanded={expanded}
            style={{ display: 'flex', alignItems: 'start', cursor: 'pointer' }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        }
        sx={{ pr: '4px' }}
      />
      <ExpandableCardContent expanded={expanded}>{content}</ExpandableCardContent>
    </Card>
  );
};

export default function FaqList() {
  return (
    <div>
      {faqsData.faqs.map((faq, index) => (
        <ExpandableCard key={index} title={faq.title} content={faq.content} />
      ))}
    </div>
  );
}
