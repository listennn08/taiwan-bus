import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { rootState } from '../store'
import { addCount } from '../store/count/action'

interface IProps {
  count: number,
  addCount: typeof addCount
}

function Count ({ count, addCount }: IProps) {
  return (
    <div className='container'>
      <h2 className='text-3xl leading-relaxed'>
        AddCount: <span className='text-primary'>{count}</span>
        </h2>
      <button
        onClick={addCount}
        className='btn'
      >
        add
      </button>
    </div>
  )
}

const mapStateToProps = (state: rootState) => ({
  count: state.count.count
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addCount: bindActionCreators(addCount, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Count)