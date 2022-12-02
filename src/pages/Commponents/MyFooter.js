import styles from "../main.module.scss";
import {CloudFilled, CopyrightOutlined} from "@ant-design/icons";
import {Layout} from "antd";

const { Footer } = Layout;

const MyFooter = () =>
    <footer className={styles.layout_footer}>
        <div>Ebai Cloud Work Stations <CloudFilled/> Daisy Huang & Ethan Xiaobai</div>
        <div style={{marginTop: 10}}><CopyrightOutlined /> 2022 上师大 地科2班开发组</div>
    </footer>
        // {/*<Footer style={{textAlign: 'center'}}>*/}
        // {/*    <div>Ebai Cloud Work Stations <CloudFilled/> Daisy Huang & Xiaobai</div>*/}
        // {/*    <div style={{marginTop: 10}}><CopyrightOutlined /> 2022 上师大地科2班开发组</div>*/}
        // {/*</Footer>*/}

export default MyFooter;