import { Navbar } from '@/components'
import React from 'react'

const termsOfService = () => {
  return (
    <>
    <Navbar/>
    <div className='layout'>
    <main className="article-container">
      <div className="article-div title-container">
        <h2>Terms of Service</h2>
        <h3>By commissioning me, you agree to the following terms of services. Failure to abide by these terms will result in the cancellation of your order and you will be blacklisted for any future commissions.</h3>
        <p>The terms below are for personal use commissions.</p>
      </div>
      <hr />
      <div className="article-div" id="payment-terms">
        <h3 className="terms-h3">Payment</h3>
        <ul className="terms-ul">
          <li>I accept Paypal only (accepted currencies are USD and HKD)</li>
          <li>An invoice will be sent upon the start of the commission. The payment must be done in full upfront.</li>
          <li>Please do not pay until we have discussed and agreed on the commission payment.</li>
          <li>Payment plans are available, please contact me to discuss details if you would like one.</li>
          <li>Refunds are only possible before the commission has been started, refunds will not be possible if the client cancels partway through the commission process and the client will not be allowed to chargeback.</li>
          <li>I will offer a partial refund depending on progress made if I am unable to complete the commission. The exact amount will be negotiated with the client.</li>
        </ul>
      </div>
      <hr />
      <div className="article-div" id="process-terms">
        <h3 className="terms-h3">Process</h3>
        <ul>
          <li>I may decline the commission if I am not comfortable with completing it.</li>
          <li>Please provide all details regarding the commission at the start, such as design references, deadlines, canvas size and resolution, as well as any other information. Any changes/corrections that need to be made as a result of failing to do so will cost extra.</li>
          <li>The commission will take up to two months to complete. I do not take orders that have a deadline below 1 week.</li>
          <li>Commissions with a set deadline has an additional cost and may not be available depending on my schedule. Please check with me for a quote and my availability before ordering.</li>
          <li>The client is not allowed to push the deadline to an earlier date or establish one partway through. This can only be done if I have not started on the commission.</li>
          <li>Upon agreement to start the commission, the content of the commission cannot be changed.</li>
          <li>I will update the client on the progress, the frequency at which I do so will depend on personal circumstance. I will notify you about any circumstances that may cause delays.</li>
          <li>No more changes will be allowed after you confirm the sketch. Revisions from that point on will incur an additional fee.</li>
          <li>I will send you a high resolution png file of the commission upon completion via email.</li>
        </ul>
      </div>
      <hr />
      <div className="article-div" id="usage-terms">
      <h3 className="terms-h3">Usage</h3>
        <ul className="terms-ul">
          <li>All commissions completed are for personal use only unless specified otherwise. Prior discussion is required if you would like commercial rights.</li>
          <li>I have full rights and ownership to the commissioned work.</li>
          <li>I may post the commissioned work onto my social media and use it for promotion. Please discuss with me beforehand if you would like a private commission.</li>
          <li>Reposting my artwork is allowed as long as credit is provided.</li>
          <li>Do not trace my artwork or remove my signature.</li>
          <li>Do not alter my artwork without permission.</li>
          <li>Do not create NFTs using my artwork.</li>
        </ul>
      </div>
      <hr />
      <div className="article-div" id='allowed'>
        <div className='can-do'>
          <h3 className="terms-h3" id="can">I can do</h3>
          <ul className="terms-ul">
            <li>Human/Humanoid characters</li>
            <li>OCs and fanarts</li>
            <li>Backgrounds</li>
          </ul>
        </div>
        <div className='cant-do'>
          <h3 className="terms-h3" id="cant">I can&apos;t do</h3>
          <ul className="terms-ul">
            <li>NSFW</li>
            <li>Gore</li>
            <li>Furry/Anthro</li>
          </ul>
        </div>
      </div>
    </main>
    </div>
    </>
      
  )
}

export default termsOfService