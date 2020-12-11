import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Loader from "@components/UI/Loader";
import {connect} from "react-redux";
import {fetchTests} from "@src/redux/actions";

class TestList extends Component {

    componentDidMount () {
        const { fetchTestsFromDataBase } = this.props;
        fetchTestsFromDataBase();
    }

    renderTests = () => {
        const {quiz} = this.props;
        if(!quiz) {
            return <h5 className='text-muted text-white-50 font-italic'>There no any tests in the database...</h5>
        }
        return <ul className='list-group border border-white'>
            {
                Object.keys(quiz).map((key, index) => {
                    const  {createdAt, title} = quiz[key]['quizInfo'];
                return (
                    <li className='d-block'  key={key}>
                        <Link
                            className='list-group-item bg-secondary text-white d-flex justify-content-between'
                            to={`/quiz/${key}`} >
                            <span>
                                {
                                    title || `Test ${index+1}`
                                }
                            </span>
                            <span>
                                {
                                    new Date(createdAt).toLocaleString()
                                }
                            </span>
                        </Link>
                    </li>
                )
            })
            }
        </ul>
    }

    render() {
        const {loading, error} = this.props;
        if(loading) {
            return <Loader/>
        }

        if(error) {
            return <h4
                className='text-white-50  mt-4 font-italic'>
                    {error}
                </h4>
        }

        return (
            <div className='bg-transparent text-dark mt-5' >
                <h4 className='my-3 font-italic text-white'>Choose test:</h4>
                  { this.renderTests() }
            </div>
        );
    }
}

const mapStateToProps = ({testList}) => {
    return {
        quiz: testList.quiz,
        loading: testList.loading,
        error: testList.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTestsFromDataBase:() => dispatch(fetchTests())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestList);