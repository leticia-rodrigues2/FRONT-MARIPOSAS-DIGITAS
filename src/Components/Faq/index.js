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
      "title": "O que é o Mariposas Digitais?",
      "content": "Aqui está o conteúdo expandido. Você pode adicionar mais informações sobre o FAQ, detalhes adicionais, ou qualquer outra coisa."
    },
    {
      "title": "Como faço para obter apadrinhamento?",
      "content": "Aqui está o conteúdo expandido. Você pode adicionar mais informações sobre o FAQ, detalhes adicionais, ou qualquer outra coisa."
    },
    {
      "title": "Como faço para me voluntariar enquanto mentora?",
      "content": "Aqui está o conteúdo expandido. Você pode adicionar mais informações sobre o FAQ, detalhes adicionais, ou qualquer outra coisa."
    }
  ]
};

const ExpandableCardContent = ({ expanded, children }) => (
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <Typography variant="body1">{children}</Typography>
    </CardContent>
  </Collapse>
);

const ExpandableCard = ({ title, content }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '100%', marginBottom: 6, bgcolor:'#ddeff8', paddingRight:4 ,paddingLeft:4 }}>
      <CardHeader
      title={
        <Typography variant="h6" sx={{ color: '#737678', fontSize:'20px', fontWeight:"600" }}>
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