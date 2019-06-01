import React, { Component } from "react";
import LayoutDrawer from "../../components/LayoutDrawer";
import { Grid, Button, TextField, Paper, InputBase, IconButton, Divider, Icon } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import styles from "./Chat.scss";

/** Tela de conversa com o Bot */
export default class Chat extends Component {
  public render() {
    return (
      <LayoutDrawer title="Chicó - Home">
        <Grid container spacing={3} className={styles.footer}>

          <InputBase className={styles.input} placeholder="Digite sua mensagem aqui" />
          <IconButton color="primary" className={styles.iconButton} aria-label="Directions">
            <SendIcon />
          </IconButton>

        </Grid>
      </LayoutDrawer >
    );
  }
}
