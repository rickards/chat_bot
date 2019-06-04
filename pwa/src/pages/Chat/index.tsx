import React, { Component } from "react";
import LayoutDrawer from "../../components/LayoutDrawer";
import { Grid, Paper, InputBase, IconButton, Divider } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import styles from "./Chat.scss";

/** Tela de conversa com o Bot */
export default class Chat extends Component {
  public render() {
    return (
      <LayoutDrawer title="Chicó - Home">
        {/* Rodapé com input de texto */}
        <div className={styles.footer}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <InputBase
                  className={styles.input}
                  placeholder="Digite sua mensagem aqui"
                />
                <IconButton
                  color="primary"
                  className={styles.iconButton}
                  aria-label="Directions"
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </LayoutDrawer>
    );
  }
}
