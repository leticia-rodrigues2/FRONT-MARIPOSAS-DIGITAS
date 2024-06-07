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
      content: "Mariposas Digitais é uma plataforma que visa facilitar a conexão entre mentoras e pessoas em busca de orientação e mentoria em diversas áreas do mundo digital. Funcionando como um meio de mentoramento, o Mariposas Digitais proporciona um ambiente onde mentoras experientes podem compartilhar seus conhecimentos, insights e experiências com aqueles que desejam aprender e se desenvolver nessas áreas. Essa troca de conhecimento e experiência ajuda a impulsionar o crescimento pessoal e profissional dos envolvidos, criando uma comunidade colaborativa onde todos têm a oportunidade de crescer e se destacar no mundo digital."
    },
    {
      title: "Como faço para obter apadrinhamento?",
      content: "Comece criando um perfil completo e informativo no Mariposas Digitais e selecione a opção <b>Desejo ser mentorada - receber apadrinhamento</b>. Isso ajudará as mentoras a entenderem seus interesses, habilidades e metas de aprendizado."
    },
    {
      title: "Como faço para me voluntariar enquanto mentora?",
      content: "Criando um perfil completo e informativo no Mariposas Digitais e selecione a opção <b>Desejo ser mentora</b>."
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
