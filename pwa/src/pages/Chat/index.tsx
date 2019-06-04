import React, { Component } from "react";
import LayoutDrawer from "../../components/LayoutDrawer";
import {
  Grid,
  Paper,
  IconButton,
  Typography,
  Input,
  InputAdornment,
  withStyles
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import styles from "./Chat.scss";
import { IChatMessage } from "../../services/types";

interface IChatStates {
  messages: IChatMessage[];
  phrase: string;
  typping: boolean;
}

/** Tela de conversa com o Bot */
class Chat extends Component<{}, IChatStates> {
  public state: IChatStates = {
    messages: [],
    phrase: "",
    typping: false
  };
  private chatRef = React.createRef();
  /** Entrada de mensagem do chat */
  private chatEntrie = (isHuman: boolean, message: string) => {
    const mainClasses = [styles.paperChat];
    mainClasses.push(isHuman ? styles.human : styles.bot);

    return (
      <Paper className={mainClasses.join(" ")}>
        <Typography variant="body1">{message}</Typography>
      </Paper>
    );
  };

  /** Adiciona uma nova mensagem ao chat */
  public addMessage = (isHuman: boolean, message: string) => {
    const { messages } = this.state;
    messages.push({ isHuman, message });
    this.setState({ messages });
  };

  /** Handler para campo de texto modificado */
  private handleChangePhrase = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ phrase: value });
  };

  /** Envia uma nova mensagem */
  private handleSendMessage = () => {
    const { phrase } = this.state;
    if (phrase) {
      this.addMessage(true, phrase);
      this.setState({ phrase: "" });
      this.randMessage();
    }
  };

  /** Envia uma mensagem aleatoria */
  private randMessage = () => {
    window.setTimeout(() => {
      this.setState({ typping: true });
    }, 500);
    window.setTimeout(() => {
      this.setState({ typping: false });
      this.addMessage(false, "Fala ai meu camarada!");
    }, 3200);
  };

  public componentDidUpdate() {
    if (this.chatRef.current) {
      const chatElem = this.chatRef.current;
      // @ts-ignore
      chatElem.scrollTo(0, chatElem.scrollHeight);
    }
  }

  /** Fluxo de renderização do react */
  public render() {
    const { messages, phrase, typping } = this.state;
    return (
      <LayoutDrawer title="Chicó" typping={typping}>
        {/* Histórico da conversa */}
        <Grid
          container
          spacing={1}
          justify="center"
          className={styles.chatContainer}
          ref={this.chatRef}
        >
          {messages.map((entrie, index) => {
            return (
              <Grid item xs={9} key={index}>
                {this.chatEntrie(entrie.isHuman, entrie.message)}
              </Grid>
            );
          })}
        </Grid>

        {/* Rodapé com input de texto */}
        <div className={styles.footer}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
              <Paper className={styles.paperInput}>
                <Input
                  fullWidth
                  placeholder="Digite sua mensagem aqui"
                  value={phrase}
                  onChange={this.handleChangePhrase}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleSendMessage}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </LayoutDrawer>
    );
  }
}
export default withStyles(styles)(Chat);
