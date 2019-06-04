import React, { Component, ReactNode } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";

import chicoImg from "../../images/chico.png";

import styles from "./LayoutDrawer.scss";

interface ILayoutDrawerProps {
  /** Titulo da página */
  title: string;
  children: ReactNode;
  typping?: boolean;
}

/** Drawer padrão de todas as telas do app */
export default class LayoutDrawer extends Component<ILayoutDrawerProps> {
  public render() {
    const { children, title, typping } = this.props;
    return (
      <div>
        {/* Cabeçalho */}
        <AppBar position="fixed" className={styles.appBar}>
          <Toolbar>
            <Avatar src={chicoImg} />
            <div>
              <Typography className={styles.appTitle} variant="h6" noWrap>
                {title}
              </Typography>
              {typping && (
                <Typography className={styles.typping} variant="caption">
                  digitando...
                </Typography>
              )}
            </div>
          </Toolbar>
        </AppBar>

        {/** Conteúdo da página */}
        <main className={styles.content}>
          <div>{children}</div>
        </main>
      </div>
    );
  }
}
