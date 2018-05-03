import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeCourse } from '../actions';

class Schedule extends Component {

    constructor(props) {
        super(props)

        this.renderCourse = this.renderCourse.bind(this);

        this.state = {
            enrolled: []
        }
    }
 
    renderCourse(course) {
        return ( 
            <div key={this.state.enrolled.indexOf(course)} className={`slot ${course.enrolled ? 'slot-course' : 'slot-empty'}`}>
                <div className="slot_title">{course.enrolled ? course.title : 'Empty Slot'}</div>
                <a className={`action slot-remove`} onClick={() => this.props.removeCourse(course)}>remove course</a>
            </div>        
                    
        )
    }

    componentWillReceiveProps(nextProps) {
        var newEnrolled = []

        this.state.enrolled.map((course) => {
            console.log(course.title);
            if(course.enrolled) {
                newEnrolled.push(course);
            }
        })

        nextProps.courses.map((course) => {
            if(course.enrolled && !newEnrolled.includes(course)) {
                console.log(course.title);
                newEnrolled.push(course)
            }  
        })
        for(var i = newEnrolled.length; i < 5; i++)
        this.setState ({
            enrolled: newEnrolled
        })
    }
    
    render() {
        return (
            <div>
                <div className="schedule-slots">
                     {this.state.enrolled.map(this.renderCourse)}
                </div>
            </div>  


        )
    }
}

function mapStateToProps(state) {
    var enrolledCourses = []
    state.courses.map((course) => {
        if(course.enrolled) {
            enrolledCourses.push(course);
        }
    })
    return { courses: enrolledCourses };
}

function mapDispatchToProps(dispatch) {
    return {
        removeCourse: (course) => {
            dispatch(removeCourse(course))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);