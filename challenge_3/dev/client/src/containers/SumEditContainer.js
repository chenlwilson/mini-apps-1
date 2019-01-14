import { connect } from 'react-redux';
import showF2 from '../actions/showF2.js';
import getInfo from '../actions/getInfo.js';
import showSum from '../actions/showSum.js';
import SumEdit from '../components/SumEdit.js';

const mapStateToProps = (state) => {
  return {
    err: state.err,
    info: state.info
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF2: () => {
      dispatch(showF2())
    },
    showSum: () => {
      dispatch(showSum())
    }
  }
}
var SumEditContainer = connect(mapStateToProps, mapDispatchToProps)(SumEdit)

export default SumEditContainer;