import {
  ChevronLeft,
  ChevronRight,
  Download,
  Settings2,
  Sheet,
  SortDesc,
} from "lucide-react";
import styles from "./Inspection.module.css";
import Button from "../../../../components/button/Button";

const Inspection = () => {
  return (
    <div className={styles.inspection}>
      <div className={styles.history}>
        <h3>Inspection History</h3>
        <div className={styles.actions}>
          <SortDesc size={30} />
          <Settings2 size={30} />
          <Button label="New Inspection" />
        </div>
      </div>
      <div className={styles.inspHistory}>
        <table>
          <thead>
            <tr>
              <th>Code Reference</th>
              <th>Date</th>
              <th>Vulnerability</th>
              <th>Security Level</th>
              <th>Risk Score</th>
              <th>Network</th>
              <th>Language</th>
              <th>Vulnerability Categories</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0x1234</td>
              <td>12/12/2021</td>
              <td>Reentrancy</td>
              <td>High</td>
              <td>9.8</td>
              <td>Mainnet</td>
              <td>Solidity</td>
              <td>Reentrancy</td>
              <td>
                <Download size={24} />
              </td>
            </tr>
            <tr>
              <td>0x1234</td>
              <td>12/12/2021</td>
              <td>Reentrancy</td>
              <td>High</td>
              <td>9.8</td>
              <td>Mainnet</td>
              <td>Solidity</td>
              <td>Reentrancy</td>
              <td>
                <Download size={24} />
              </td>
            </tr>
            <tr>
              <td>0x1234</td>
              <td>12/12/2021</td>
              <td>Reentrancy</td>
              <td>High</td>
              <td>9.8</td>
              <td>Mainnet</td>
              <td>Solidity</td>
              <td>Reentrancy</td>
              <td>
                <Download size={24} />
              </td>
            </tr>
            <tr>
              <td>0x1234</td>
              <td>12/12/2021</td>
              <td>Reentrancy</td>
              <td>High</td>
              <td>9.8</td>
              <td>Mainnet</td>
              <td>Solidity</td>
              <td>Reentrancy</td>
              <td>
                <Download size={24} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.navigation}>
          <nav>
            <ChevronLeft size={24} />
            <span>1</span>
            <ChevronRight size={24} />
          </nav>
          <div className={styles.export}>
            <Sheet size={24} />
            <span>Export to sheets</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspection;
