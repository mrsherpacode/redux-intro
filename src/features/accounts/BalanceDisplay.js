import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}
// The  older way of connecting react and redux store
function mapStateToProp(state) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProp)(BalanceDisplay);
