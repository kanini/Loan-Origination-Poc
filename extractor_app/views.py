import os
import fitz
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv

import openai
import google.generativeai as genai

load_dotenv()

# Load keys from environment variables or Django settings
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

openai.api_key = OPENAI_API_KEY
genai.configure(api_key=GEMINI_API_KEY)

# Function to extract text from PDF
def extract_text_from_pdf(file_path):
    try:
        doc = fitz.open(file_path)
        extracted_text = "\n".join([page.get_text() for page in doc])
        doc.close()
        return extracted_text
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

# Function to send the extracted text to the selected model and get entities
def extract_entities_from_model(extracted_text, selected_model):
    prompt = f"""System: You are a senior financial documentation specialist with 10 years of experience in USA financial loan and banking services. Your expertise includes loans and financial data analysis.

Document Content:
{extracted_text}

Instructions:
- Identify and list all relevant entities within the document. If additional fields are found that aren’t specified, please include them. If any fields are missing in the document, ignore them.
- Extract information on:
  - Lender Information (e.g.Lender Name, Address, Phone, Email, NMLS ID, License Number)
  - Borrower Information (e.g., Borrower Name,Additional Borrower Name, Loan Number, Date of Birth, Phone, Address)
  - Basic information (e.g., 203KIndicator, Ability To Repay Loan Type , Access By HUD, Access By USDA, Access By VA, Account Number, Account Type, ACPIndicator, Actual Est Appr Value, All Other Monthly Payments, Amortization Term, Amortization Type, Amount Financed, Annual Interest Rate, Annual Percentage Rate, APORZ, Applicant Employer, Applicant Employer Div, Applicant Empl Status, Applicant Job Title, Appraisal Type, Appraised Price, Appraised Value, Appraised Value Z, APR, APRZ, ARM Indicator, ATM Debit Card Withdrawal, Automated Underwriting System, Automated Underwriting System Result, Balloon Payment, Balloon Term, Baloon Payment Z, Base Income, Base Loan Amount, Base Loan Amount Z, Baths, Bedrooms, Beginning Balance, Borrower1Authorization Number, Borrower1SSN, Borrower2Authorization Number, Borrower3Authorization Number, Borrower3Credit Score, Borrower3SSN, Borrower4Authorization Number, Borrower4Credit Score, Borrower4SSN, Borrower5Credit Score, Borrower5SSN, Borrower Cell, Borrower Cell Phone, Borrower Credit Score, Borrower Current Position, Borrower DOB, Borrower Email, Borrower Email address, Borrower Home, Borrower Name Whole, Borrower Phone Home, Borrower SSN, Borrower SSNOPen, Borrower Work, Borrower Work Phone, Bought Down Rate, Branch Name, Buydown Funds Source, Buy Down YN, CAIVRSNumber, Calculated LTVCLTV, Case File ID, Cash Required, Cash To Close, Cash To Close LE, CD3Total Closing Costs Final, CD3Total Closing Costs LE, CD3Total Due From Borrower At Closing, CD3Total Paid Already By OOn Behalf Of Borrower At Closing L, CD5Lender Loan Officer Email, CD5Lender Loan Officer Phone, CD5Mortgage Broker Loan Officer Email, CD5Mortgage Broker Loan Officer Phone, Census Alt Tract, Census MSA, Census Tract, Certificate Number, Child Support, City Monthly Payment, City Property Tax, Class Code, Closing Costs, Closing Costs Financed Before Closing Paid From Your Loan Amount Final, Closing Costs Financed Before Closing Paid From Your Loan Amount LE, Closing Costs Paid Before Closing Final, Closing Costs Paid Before Closing LE, CLTV, Cob Borrower Email, Co Borrower Cell, Co Borrower Credit Score, Co Borrower Email address, Co Borrower Home, Co Borrower Phone Cell, Co Borrower Phone Home, Co Borrower SSN, Co Borrower Work, Co Borrower Work Phone, Comitment Certificate Number, Commitment Certificate Number, Community Lending, Community Panel Number, Comp1Address, Comp1Price, Comp2Address, Comp2Price, Comp3Address, Comp3Price, Coop Indicator, Co Op Indicator, Corporate Relocation, Correspondent ID, County Monthly Payment, County Property Tax, Coverage, Coverage Amount, Coverage Percentage, Coverage Plan, Credit Factor01, Credit Factor02, Credit Factor03, Credit Factor04, Credit Factor05, Credit Factor06, Credit Factor07, Credit Factor08, Credit Factor10, Credit Factor11, Credit Factor12, Credit Factor13, Credit Factor14, Credit Factor15, Credit Factor16, Credit Factor17, Credit Factor18, Credit Factor19, Credit Factor20, Credit Factor21, Credit Reference No, Credit Report No, Credit Report Ranking, Credit Report Type, Credit Score Borrower1, Credit Score Model, CServices You Can Shop For, Current Appraised Value, Current Finance Charge Z, Current Interest Rate, Current Principal Balance, Debit Transaction Amount, Debit Transaction Description, Debt Including Under Ten Mos, Debt To Income Ratio, Debt With Undisclosed, Delegated Non Delegated, Deposit Final, Deposit LE, Deposits Credits Additions, Development Type, Disclosed APRZ, Disclosed Finance Charge Z, Discount, Discount Points, Down Payment Funds From Borrower Final, DTI, DTIPass Fail, DTota Loan Costs, DUCase ID, Due From Borrower At Closing, Due To Seller At Closing, DUVersion, Electronic Withdrawl, Eligible For Safe Harbor Z, Employee Avg Hours Worked, Employee Pay Frequency, Employee Pay Period Freq, Employee Pay Rate, Employer Phone Verified, Employment Verifier Phone, Empl Verific Reference No, Empl Verific Tracking No, Ending Balance, ENote, Escrow Cushion, Escrowed, Escrowed Property Taxes Year Onea, Escrowed Property Taxes Year Oneb, Escrow Monthly Payment, Escrow Waiver, Estimated Cash To Close, Estimated Closing Costs, Estimated Closing Costs Financed, Estimated Escrow, Estimated Property Costs Year1, Estimated Taxes, Estimated Taxes Insurance Assessments, Estimated Total Monthly Payment, Estimated Total Payoffs And Amounts, Estimated Value, Est Taxes Insur Assessments, Ethnicity Hisp Or Latino, Ethnicity Hisp Or Latino Cub, Ethnicity Hisp Or Latino Oth, Ethnicity Hisp Or Latino Pu Rn, Ethnicity Not Hisp Or Latino, Fannie Mae DUResponse, Fannie Mae Response, FEMAMap No, FHAADPCode, FHAAgency Case Number, FHACase No, FHACase No V02, FHACase Number, FHASection, FHASection Code, FHAStreamline, File Number, File Status, Finance Charge, Financed Premium Amount, FIPSCode, First Premium Amount, First Premium County Amount, First Premium County Percentage, First Premium Muncipal Tax Amount, First Premium Muncipal Tax Percentage, First Premium Percentage, First Premium Surcharge Amount, First Premium Surcharge Percentage, First Premium Total Amount, First Year Annualized Premium Percentage, Five Year Payments, Five Year Principal, Flood, Flood Cert No, Flood Cert Number, Flood CMPCO, Flood Community Name, Flood Contract Type, Flood Insurance, Flood Panel, Flood Panel Number, Flood Program, Flood Required Flag, Flood Suffix, Flood WI250ft, Flood Zone, Flood Zone In, Form Number, Freddie Mac LPARespone, Freddie Mac Response, Funds For Borrower Final, Funds For Borrower LE, Gender, Genderc Do Not Wish To Provide, GInitial Escrow Payment, GLTV, Hazard Insurance, Hazard Insurance Z, HCLTV, Hispanic Do Not Wish To Provide, HOADues, HOAFees Z, HOAIndicator, Homeowners Insurance, Homeowners Insurance Escrow, Homeowners Insurance Escrow YN, Housing Expense, Housing Expense Ratio, Housing Ratio1Z, HUDGNND, Income, Income Base, Income Bonus, Income Commission, Income Other, Income Overtime, Income Positive Net Rental, Income Total, Ind Employer Phone Location, Initial Escrow Payment, Initial PIPayment, Initial Premium, Initial Premium Rate, Initial Renewal1Amount, Initial Renewal1Rate, Initial Renewal2Amount, Initial Renewal2Rate, Initial Year Amount, Initial Year Rate, In SFHA, Institution, Insured Loan Amount, Insured Loan Number, Interest Collectedat Closing, Interest Collected At Closing, Interested Party Contributions, Interest Only Flag, Interest Only Z, Interest Rate, Interest Rate Change, Interest Rate Increase YN, Interest Rate Initial, Investor Loan Number, Late Charge Max Dollar, Late Charge Percentage, Late Charge Type PITI, Late Fee Rate, Late Payment Basis, Late Payment Grace, Late Payment Grace Days, Late Payment MP, Late Payment Percentage, Late Payment PI, Late Payment PITI, Lease Ground Rent, Lender Credits, Lender Loan Number, Lender Loan Officer Email, Lender Loan Officer NMLSxx License, Lender Loan Officer Phone, Lender NMLS, Lender NMLSxx License, Lender Verifier Title, LEPurpose, Lien Monthly Payment, Lien Position, Lien Type, Loan Amount, Loan Amount Change, Loan Amount Increase YN, Loan Amount LE, Loan Amount Original, Loan Amount Z, Loan Costs, Loan ID, Loan Level Credit Score, Loan Limit, Loan Limit Z, Loan No, Loan Number, Loan Number Investor, Loan Number Seller, Loan Number Z, Loan Program, Loan Purpose, Loan Repayment Type, Loan Representative Score, Loan Status, Loan Term, Loan To Value, Loan Type, Lock In Fee, Lock In Refundability, Lo Type, LTV, LTVto CLTV, Marital Status, Master Policy Number, Maximum Rate, Maximum Rate Z, Max Payment Z, MERSMINNumber, MERSMOMIndicator, Mers Number, MERSRegistration Flag, MICNumber, MIN, MIP, MIPIncrease YN, Misc Ins, Misc INS, Monthly All Other Payments, Monthly Escrow Payments, Monthly MIP, Monthly Negative Net Rental, Monthly Payment, Monthly Payments First PI, Monthly Payments First PIQualifying, Monthly Payments Hazard Insurance, Monthly Payments HOAFees, Monthly Payments Mortgage Insurance, Monthly Payments Second PI, Monthly Payments Taxes, Monthly Principal And Interest, Monthly Principalnd Interest Change, Monthly Subj Neg Cash Flow, Monthly Total Expense Payment, Months Reserve, Months Reserves, Mortgage Broker Loan Officer Email, Mortgage Broker Loan Officer NMLSxx License, Mortgage Broker NMLSxx License, Mortgage Insurance, Mortgage Insurance Z, Mortgage Loan Originator NMLSRIdentifier, Mortgage Paymentto Income, Mortgage Total UFMIP, Mortgage Type, Mortgage WOUFMIP, Mortgage WUFMIP, Negative Amortization, Negative Amortization Z, Negative Cash Flow, Negative Rental Cashflow, Net Rental Income, New Construction, NFIPCommunity Name, NFIPCommunity Number, Non Delegated, Non Escrowed Property Taxes Year One, Note City, Note Rate, Note Rate Z, Note State, Number, Number Bathrooms, Number Bedrooms, Number Of Applicants, Numberof Units, Number Of Units, Number Resubmissions, Number Rooms, Number Units, Occupancy, Occupancy Code, Occupancy Status, Occupancy Type, Occupancy Type, Occupy Code, Original Mortgage Amount, Original Value, Origination Charges, Originator NMLS, Originator Type, Originial Mortgage Amount, Oriiginal Appraised Value, Other, Other Costs, Other Income, Other Z, Outstanding Principal Balance, Owner Type, Paid Type, Payment Calculation, Payment Frequency, Payment Plan, Period1PMT, Period2PMT, Period3PMT, Period4PMT, Period5PMT, Period Months, Permissible Ver Purpose, PI, PIPayment, Plan LTV, PLan LTV, Plan LTV1, Plan LTV2, PMIMIPPayee Company, PMIMonthly Payment, PMIRate, PMIRate Percentage, Points, Points Paid By Borrower, Policy Number, Premium Due Now, Premium Plan Type, Premium Refundability, Premium Term Beg, Premium Term End, Prepaid Interest, Prepaids, Prepayment Penalty, Prepayment Penalty Amount Z, Prepaymet Penalty Payoff Z, Price Square Foot, Principal And Interest, Product, Product Name, Product Type, Property Address, Property Address Street, Property Address Ziip Code, Property Condition, Property Taxes Escrow, Property Taxes Escrow YN, Property Type, Property Value, Purchase Price, Purchase Price Z, Qualified Mortg Loan Type Z, Qualifying Debt Ratio, Qualifying Rate, Qualifying Rate Z, Race Amer Ind Alaskan Nat, Race Am Ind Alaska Nat Trb, Race Asia Chinese, Race Asian, Race Asian Filipino, Race Asian Indian, Race Asian Japanese, Race Asian Korean, Race Asian Other, Race Asian Vietnamese, Race Dont Wish To Provide, Race Nat Hawl, Race Nat Haw Other Pac Isl, Race Nat Haw Other PI, Race Nat Haw Other PIGuam Chaml, Race Nat Haw Other PISamoanl, Race Other Asian, Race White, Rate Lock Period, Ratio Primary Housing Exp Income, Recommendation, Refi Purpose, Refundability, Refund Type, Renewal1, Renewal Option, Renewal Type, Replacement Reserve, Representative Credit Score, Safe Harbor, Sale Price, Sales Price, Second Mortgage PI, Second PAnd IZ, Seller Credits Final, Seller Credits LE, Services Borrower Did Not Shop For, Services Borrower Did Shop For, Services You Cannot Shop For, Size, Source Of Funds, Square Feet, SSN, SSNLast Four, Start Payment Z, Storm Wind, Submission Number, Submission Type, Taxes And Other Government Fees, Taxes Special Assessments, Taxes Z, Taxpayer SSNLast Four, Tax Trans Account Balance, Tax Trans Account Balance Plus Accruals, Tax Trans Accr Int, Tax Trans Accr Pnlty, Tax Trans Adjusted Gross Income, Tax Trans Bus Inc Or Loss, Tax Trans Capital Gain Or Loss, Tax Trans Customer File Number, Tax Trans Exemptions, Tax Trans Filing Status, Tax Trans Form Number, Tax Trans Order Number, Tax Trans Other Income, Tax Trans Rent Royalty PE, Tax Trans SETaxable Income, Tax Trans SETaxable Income Spouse, Tax Trans SETaxable Income Taxpayer, Tax Trans Taxable Income, Tax Trans Taxable Int Inc, Tax Trans Tax Per Return, Tax Trans Total SETax, Tax Trans Tracking Number, Tax Trans Wages Salaries Tips, TIP, Total All Monthly Payments, Total Amount Due Now, Total Closing Costs, Total Fixed Payments, Total Fixed Paymentto Income, Total Income, Total Installment Debt, Total Interest Percentage, Total Loan Amount, Total Loan Amount Change, Total Mortgage Payment, Tota Loan Costs, Total Other Costs, Total Payments, Total Payoffs And Payments Final, Total Payoffs And Payments LE, Total Primary Housing Expense, Total Rooms, Total Units, Transaction Type, Type Ind Employer Phone Loc DA, Type Ind Employer Phone Loc I, Type Ind Employer Phone Loc O, ULI, Underwriting Status, Undiscounted Rate, Undiscounted Rate Z, Upfront MIAmount, USDAAnnual Disb Amount, USDABorrower ID, USDAGuarantee Number, USDARHSCode, USDAUpfront Amount, UWRecommendation, VAIRRL, Validated Employer Phone, VANumber, Verification Type, Verified Assets, Verified Liabilities, WITax Option)
  - Term and Tenure details (Amortization Term, Application Date, Application Date Z, Application Received Date, Applic Total Time WEmpl, Appl Orig Hire Date, Appraisal Date, Appraisal Effective Date, Borrower1DOB, Borrower2DOB, Borrower Dateof Birth, Borrower DOB, Borrower DOBOpen, Borrower Employment Start Date, Casefile Create Date, Caseile Create Date, Closing Date, Co Borrower Dateof Birth, Co Borrower DOB, Commitment Effective Date, Commitment Expiration Date, Commitment Term, Commitment Updated, Credit Report Date, Current Appraised Date, Current Due Date, Current Effective Date, Date Commitment Effective, Date Commitment Expiration, Date Ordinal, Date Printed, Debit Transaction Date MMDD, Disbursement Date, Doc Date, Doc Date V1, Due Z, End Date, Escrow Waived Date, FHACase Number Assignment Date, First Due Date, First Payment Date, First Regular Payment, First Submission Date, First Subsidy Due Date, Flood Cert Date, Flood Determination Date, Flood Map Date, Grace Days, Initial Renewal1Period, Initial Renewal2Period, Initial Year Period, Interest Only Expiration Date, Last Rate Lock Date Z, Last Submission Date, Late Charge Grace Days, Loan Closing Date, Loan Maturity Date, Loan Term, Lock In Expires, Maturity Date, MERSRegistration Date, Note Date, Note Date V1, Note Date V2, Number Months Reserve, Original Appraised Date, Panel Date, Payment Calculation, Premium Due Date, Prepayment Period Z, Property Age, Rate Lock Date, Rate Lock Date Z, Rate Lock Until, Renewal1, Report Date, Sale Date, Startdate, Start Date, Submission Date, Submission Date Time, Tax Disbursement Date, Tax Trans Accr Int Date, Tax Trans Accr Pnlty Date, Tax Trans Completed Date, Tax Trans Due Date, Tax Trans Ordered Date, Tax Trans Processing Date, Tax Trans Request Date, Tax Trans Response Date, Tax Trans Returned, Tax Trans Tax Period, Tax Trans Year, Tax Trans Years, Term Of Coverage, Term Of Loan, Term Z, UWDecision Date, UWDecision Last Modified Date, Verified On Date, Worksheet Date)
  - Location Details (Address, Appl Employer Addr City, Appl Employer Addr L1, Appl Employer Addr L2, Appl Employer Addr State, Appl Employer Addr Zip, Borrower Addr City SZv1, Borrower Address1, Borrower Address2, Borrower Address L1, Borrower Address L11, Borrower Address Line1, Borrower City State Zip, Borrower Current Address, Census County, Census State, Census Tract, Community Panel Number, County, County Code, County Z, Current Address City C, Current Address State C, Current Address Street, Current Address Unit, Current Address Zip Code C, Customer Address, Flood Panel Number, Flood Zone, Initial Insured Address Line1, Initial Insured Address Line2, Legal Description, Lot Number, Mailing Address City, Mailing Address State, Mailing Address Whole, Mailing Address Zip Code, Mailing City, Mailing State, Mailing Street Address, Mailing Zip Code, Map Reference, Prop Addr City State, Prop Addr Street Z, Property Addess Zip Code, Property Address, Property Address1, Property Address2, Property Address City, Property Address COMBO2, Property Address County, Property Addressline1, Property Address Line2, Property Address State, Property Addresss V1, Property Address V3, Property Address Whole, Property Address Zip Code, Property Census Tract, Property City, Property Location, Property State, Property Street Address, Property Zip Code, Proprty Street Address, SMSACode, Tax IDParcel, Tax IDParcel Number)
  - Person Details (Additional Mortgagor1First Middle Last Name, Additional Mortgagor2First Middle Last Name, Applicant, Applicant1, Applicant2, Applicant Employer, Applicants, Applicant Signature, Applicants V2, Applicant With Address1, Applicant With Address2, Applicant With Address3, Applicant With Address4, Appraiser, Appraiser License Number, Appraiser Name, Attention To, Borrower, Borrower1, Borrower1Name, Borrower1Name Whole, Borrower1SSN, Borrower2Name, Borrower2Name Whole, Borrower2SSN, Borrower3First Name, Borrower3Last Name, Borrower3Middle Name, Borrower4First Name, Borrower4Last Name, Borrower4Middle Name, Borrower5First Name, Borrower5Last Name, Borrower5Middle Name, Borrower Employer, Borrower First Name, Borrower Last Name, Borrower Middle Initial, Borrower Name, Borrower Name Additional Footer, Borrower Name First, Borrower Name Footer, Borrower Name Footer4, Borrower Name Last, Borrower Name Whole, Borrowers, Borrowers Name, Borrower SSN, Borrower Z, Builder Broker, Closing Agent, Co Applicant Name Whole, Co Borrower, Co Borrower2Name Whole, Co Borrower3Name Whole, Co Borrower4Name Whole, Co Borrower First Name, Co Borrower Last Name, Co Borrower Middle Initial, Co Borrower Name, Co Borrower Name Whole, Co Borrower Z, Correspondent Name, Credit Bureau, Credit Report Company, Deliver To, Employer Contact And Title, Initial Insured Name, Initial Insured Servicer Name, Insurance Agent, Insured, Insured Customer, Insured Line1, Insured Line2, Insureds Name, Insurer A, Insurer B, Insurer C, Insurer D, Insurer E, Invester, Investor Name, Issuing Institution, Lender, Lender Loan Officer, Lender Name, Lender Verifier Name, Loan Officer, Loan Officer Name, Loan Originator, Mortgage Broker, Mortgage Broker Loan Officer, Mortgage Guaranty Insurer, Original Note Holder Name, Originator Name, Premium Paid By, Preparer, Processor, Product Advisor Assessment For, Seller, Servicer Number, Settlement Agent, Supervisory Appraiser, Taxpayer, Tax Trans Client, Tax Trans Ordered By, Tax Trans Provider, Tax Trans Requesting Company, Title Underwriter, Underwriter)
- extract only the mentioned list of topics from the document.

Format the output as follows: key and value pairs
Strictly the response must be in json format"""

    try:
        if selected_model == "openai":
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
                max_completion_tokens=4000,
            )
            return response.choices[0].message['content']

        elif selected_model == "gemini":
            model = genai.GenerativeModel('gemini-2.5-flash')
            response = model.generate_content(prompt)
            return response.text

        else:
            return "Invalid model selected."

    except Exception as e:
        return f"Error using model: {str(e)}"


@csrf_exempt
def extract_view(request):
    extracted_text = ""
    model_output = ""
    file_name = None
    file_url = None
    extracted_entities = []

    if request.method == 'POST' and request.FILES.get('pdf_file'):
        pdf_file = request.FILES['pdf_file']
        selected_model = request.POST.get('model')

        # Save the uploaded file to the server
        save_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
        os.makedirs(save_dir, exist_ok=True)
        file_path = os.path.join(save_dir, pdf_file.name)
        with default_storage.open(file_path, 'wb+') as destination:
            for chunk in pdf_file.chunks():
                destination.write(chunk)

        file_name = pdf_file.name
        file_url = os.path.join(settings.MEDIA_URL, "uploads", pdf_file.name)

        # Extract text from PDF
        extracted_text = extract_text_from_pdf(file_path)

        # Send to selected model for entity extraction
        if extracted_text and selected_model:
            model_output = extract_entities_from_model(extracted_text, selected_model)

            # Mocking extraction of entities (you can adjust this depending on your actual model output)
            extracted_entities = [{"entity": "Entity 1", "value": "Sample Value 1"},
                                  {"entity": "Entity 2", "value": "Sample Value 2"}]

    return render(request, 'index.html', {
        'file_name': file_name,
        'file_url': file_url,
        'extracted_text': extracted_text,
        'model_output': model_output,
        'extracted_entities': extracted_entities,
    })
