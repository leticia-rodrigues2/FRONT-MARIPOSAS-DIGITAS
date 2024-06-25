import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button variant="text" style={{ color: '#D457D2', textDecoration: 'underline', fontWeight: 'bold', fontSize: '10px', textTransform: 'none' }} onClick={handleClickOpen('paper')}>Termos de Uso.</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Termos de Uso da Aplicação Mariposas Digitais</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <p>
              <b>1. Objetivo da Plataforma:</b> Mariposas Digitais é uma plataforma que visa facilitar a conexão entre mulheres atuantes na área de tecnologia (madrinhas) e meninas entre treze (13) e dezoito (18) anos interessadas em tecnologia (afilhadas). Atuamos como intermediadoras para proporcionar um ambiente onde madrinhas possam compartilhar seus conhecimentos, insights e experiências com as afilhadas, visando reduzir as lacunas de gênero no setor de tecnologia e incentivar o desenvolvimento das jovens nessa área.<br /><br />
              <b>2. Coleta de Dados:</b> Para oferecer nossos serviços, coletamos as seguintes informações dos usuários: Nome, Idade, Telefone, Email, Profile, Foto de Perfil.<br /><br />
              <b>3. Uso das Informações:</b> As informações coletadas são utilizadas para conectar madrinhas e afilhadas de forma eficiente e para personalizar a experiência na plataforma. Respeitamos sua privacidade e segurança dos dados, utilizando-os apenas para os fins descritos nesta política.<br /><br />
              <b>4. Responsabilidades do Usuário:</b> Ao utilizar a plataforma, você concorda em fornecer informações precisas e atualizadas. Também se compromete a respeitar as diretrizes de conduta e a não utilizar a plataforma para fins ilegais ou prejudiciais.<br /><br />
              <b>5. Direitos de Propriedade Intelectual:</b> Todo o conteúdo disponibilizado na plataforma, incluindo textos, imagens, vídeos e recursos educacionais, são protegidos por direitos autorais. Os usuários concordam em respeitar esses direitos e não utilizar o conteúdo de forma não autorizada.<br /><br />
              <b>6. Modificações nos Termos:</b> Reservamo-nos o direito de modificar estes termos a qualquer momento, com aviso prévio aos usuários. O uso contínuo da plataforma após tais alterações constitui aceitação dos novos termos.<br /><br />
              <b>7. Contato:</b> Para mais informações sobre nossos termos de uso ou para relatar qualquer violação, entre em contato conosco através dos canais disponíveis na plataforma.<br /><br />
              Ao utilizar a plataforma Mariposas Digitais, você concorda com estes termos.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}