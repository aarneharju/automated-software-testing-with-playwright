import { Reporter } from "@playwright/test/reporter"
import * as fs from "fs"

class MyReporter implements Reporter {
    onBegin(config, suite): void {
        console.log(`Executing ${suite.allTests.length} tests.`);
    }

    onEnd(result): void {
        console.log(`Execution finished, status: ${result.status}`);
    }

    onTestBegin(test): void {
        console.log(`Execution of ${test.title} started.`);
    }

    onTestEnd(test, result): void {
        const executionTime = result.duration

        const data = {
            test: test.title,
            status: result.status,
            executionTime: executionTime,
            errors: result.errors,
        }

        const dataToString = JSON.stringify(data, null, 2)
        console.log(dataToString);

        fs.writeFileSync("test-result.json", dataToString )
        
    }
}

export default MyReporter