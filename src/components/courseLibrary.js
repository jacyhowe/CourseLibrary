import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { fetchCourses, addCourse, removeCourse, toggleDescription } from '../actions';
import AnimateHeight from 'react-animate-height';

 class CourseLibrary extends Component {
    
        constructor(props) { 
            super(props) 

            this.renderCourse = this.renderCourse.bind(this);

            }

            componentDidMount() {
                this.props.fetchCourses()
            }

        renderCourse(course) {
            return ( 
                <li key={course.title}  className={`course ${course.open ? 'course-selected' : null}`}>
                    <div className="course-info">
                        <div className="course-title-container">
                            <div className="course-title">{course.title}</div>
                            <div className={`course-check-mark ${course.enrolled ? 'show-check-mark' : 'hide-check-mark'}`}></div>
                        </div>
                            <a className={`course-arrow ${course.open ? null : 'course-arrow-close'}`} onClick={() => this.props.toggleDescription(course)}></a>
                            <a className={`course-add action ${course.enrolled ? 'course-remove' : 'course-add'}`} onClick={() => course.enrolled ? this.props.remove(course) : this.props.addCourse(course)}></a>
                           {/*} <a className={`course-remove action ${course.enrolled ? 'show-content' : 'hide-content'}`} onClick={() => this.props.removeCourse(course)}></a>*/}
                    </div>
                    
                    <AnimateHeight
                        duration={ 300 }
                        height={ course.open ? 'auto' : 0 }>
                            <div className={`course-description`}>
                            <h6 className="course-description-title">Course Description</h6>
                            <p>{course.description}</p>
                            </div>    


                    </AnimateHeight>                   
                </li>
            )
        }

        render() {

            return (
                <ul>                   
                    {this.props.courses.map(this.renderCourse)}
                </ul>
            )
        }
    }    

function mapStateToProps(state) {
       return { courses: state.courses }
}

function mapDispatchToProps(dispatch) {
        return {
            fetchCourses: () => {
                dispatch(fetchCourses())
        },
        addCourse:(course) => {
            dispatch(addCourse(course))
        },
        remove:(course) => {
            dispatch(removeCourse(course))
        },
        toggleDescription:(course) => {
            dispatch(toggleDescription(course))
    }  
}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseLibrary);