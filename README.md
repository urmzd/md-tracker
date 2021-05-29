### Neuro Tracker

A health tracker designed to help individuals with neurological disorders.

## Objectives:

- [ ] Real Time Feedback

- [ ] Allow users to set perscription reminders (push notification / alarm)
      Perscription Vyvanse 60mg

  ```
  Prescription_Public: {
  name: string;
  dosage: number;
  dosage_unit: string;
  description: string;
  }

  DayTimes: {Day: M | T | W | ... , Time: 00:00 - 23:59}

  Prescription_Private = Prescription_Public & {
  day_times: DayTimes,
  doctor: string;
  additional_notes: string;
  }
  ```

- [ ] Allow users to store/retrieve logs.

  ```
  Symptom_Classifer {
  name: string;
  description: string;
  }

  Symptom_Instance: Symptom_Classifer & {
  start: DateTime
  end: DateTime
  severity: number (/10)
  notes: string;
  }
  ```

## Access Patterns:

- Users should be able to sign up
  - First Name, Last Name, Phone Number
- Users should be able to create/read/delete/update perscriptions
- Users should be able to create/read/delete/update logs
- Users should recieve push notifications based on perscription datetime.

## Stack:

- AWS API Gateway
- AWS Lambda
- AWS Aurora
- AWS SNS
