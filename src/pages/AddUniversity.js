import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UrlLoginStep from './components/AddComponents/UrlLoginStep';
import LoginStep from "./components/AddComponents/LoginStep";

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function getSteps() {
    return ['Verification de l\'url de login', 'Create an ad group', 'Create an ad'];
}
class AddUniversity extends Component {
    constructor(props) {
        super(props);
        this.universityData = this.props.location.state;
        this.state = {
            activeStep: 0,
        };
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <UrlLoginStep saveUrl={this.saveUrl} handleNext={this.handleNext} url={this.universityData.loginUrl}/>;
            case 1:
                return <LoginStep url={this.universityData.loginUrl} identifiant={this.universityData.idEnt} password={this.universityData.passwordEnt}/>;
            case 2:
                return <h1>last step</h1>;
            default:
                return <h1>Unknown step</h1>;
        }
    };

    saveUrl = (url) => {
        this.universityData.loginUrl = url;
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    {this.getStepContent(index)}
                                    <div className={classes.actionsContainer}>
                                        <div>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&quot;re finished</Typography>
                    </Paper>
                )}
            </div>
        );
    }
}

AddUniversity.propTypes = {
    classes: PropTypes.object,
};

export default  withStyles(styles)  (AddUniversity);